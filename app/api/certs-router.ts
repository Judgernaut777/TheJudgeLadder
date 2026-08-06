import { z } from "zod";
import { desc, eq } from "drizzle-orm";
import * as schema from "@db/schema";
import { getCourse } from "@contracts/content";
import { getDb } from "./queries/connection";
import { authedQuery, createRouter, publicQuery } from "./middleware";

export const certsRouter = createRouter({
  mine: authedQuery.query(async ({ ctx }) => {
    const rows = await getDb()
      .select()
      .from(schema.certificates)
      .where(eq(schema.certificates.userId, ctx.user.id))
      .orderBy(desc(schema.certificates.issuedAt));
    return rows.map((c) => ({
      ...c,
      courseTitle: getCourse(c.courseCode)?.title ?? c.courseCode,
    }));
  }),

  /** Public verification by serial — the handle printed on the certificate. */
  verify: publicQuery
    .input(z.object({ serial: z.string().min(4) }))
    .query(async ({ input }) => {
      const cert = await getDb().query.certificates.findFirst({
        where: eq(schema.certificates.serial, input.serial.trim()),
      });
      if (!cert) return { found: false as const };
      const user = await getDb().query.users.findFirst({
        where: eq(schema.users.id, cert.userId),
      });
      const course = getCourse(cert.courseCode);
      return {
        found: true as const,
        serial: cert.serial,
        holderName: user?.name ?? "Unknown",
        courseCode: cert.courseCode,
        courseTitle: course?.title ?? cert.courseCode,
        confersLabel: cert.confersLabel,
        issuedAt: cert.issuedAt,
      };
    }),
});
