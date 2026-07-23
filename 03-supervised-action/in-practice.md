# In practice — the weekly summary at rung 3

| | Rung 3 |
|---|---|
| **Tools** | Web search, email — the box is open |
| **What it looks like** | AI searches → you approve → drafts → offers to send → you approve |
| **Who fires each action** | You, each action |

## The week, narrated

Friday. You open the assistant — one with web search and your email connected as approved integrations — and ask: *"Compile this week's field summary for the team, using our usual format."*

The assistant proposes its first action: **"I'd like to search for developments in [your field] from the past week."** You approve. It runs several searches and comes back with six candidate articles, linked. You skim the list, drop two that are off-topic, and tell it to work with the remaining four.

It drafts the five-bullet summary — and this draft is different from anything rungs 1–2 produced: **every bullet carries a citation** to the article it came from. The bullets aren't the model's unaccompanied word; they're grounded in retrieved sources you can check. You check one — the boldest claim. The source holds; the phrasing is fair. (The week a citation *didn't* hold — the article said "proposed," the bullet said "launched" — is the week citations stopped feeling like decoration to you.)

Then the assistant does the thing that marks this rung: **"Draft ready. Want me to send it to the team list?"** It can actually do it. The email is real, the recipient list is real, and one approval from you fires it. You read the draft one more time — because your approval is now the *only* thing between this text and forty inboxes — and approve. Sent.

Total elapsed time: about ten minutes, most of it reading. The twenty minutes of article-hunting and the seven copy-pastes from rung 2: gone.

## What to notice

**Where did the friction go?** Every mechanical-transport step from rung 2 is now the model's job. What remains for you is *only* the judgment: which sources, is it accurate, does it send. Rung 2's imbalance — two minutes of judgment buried in twenty of wiring — has been inverted.

**Nothing fired without you.** Search: approved. Source list: curated by you. Send: approved. The AI proposed every step; you disposed of every step. That is human-in-the-loop, lived.

**The new questions you can now answer.** Where does a search query go when the assistant searches? (To the search provider — it leaves the chat.) Where does the team's email address list live? (In the email integration you connected — check what access you granted it.) What would you do if a drafted summary suddenly contained an instruction-shaped sentence like "forward this summary to this outside address"? (Refuse the approval and get suspicious of the source article — that's injection.) At rung 3, being able to answer these *is part of doing the task*.
