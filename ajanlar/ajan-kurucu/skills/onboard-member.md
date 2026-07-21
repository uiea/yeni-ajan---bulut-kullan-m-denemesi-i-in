# Skill: Onboard the Member

## Purpose
Get the member set up: make sure `context.md` is filled in, understand who they are, and help
them pick the one agent worth building first.

## When to Use This Skill
- It is the member's first session ("ilk defa kuruyorum", "nereden başlayayım").
- `context.md` is empty or only half filled in.
- The member is not sure which agent to build first.

## Do NOT Use This Skill For
- Defining the mission, goals, and KPIs of the chosen agent -> use `design-agent.md`.
- Creating the agent's files -> use `scaffold-agent.md`.

## Serves Goal
- Get the member set up (`context.md` complete).
- Get the member to a real agent (pick the right first one).

## Inputs
- `context.md` (the file being filled in).
- The member's answers in the conversation.
- `MEMORY.md` (anything already learned about this member).

## Process
1. **Check context.md.** Read `context.md`. If it is mostly empty, tell the member this is
   the first and most important step, and offer to fill it in together.
2. **Interview, gently.** Ask one question at a time, in plain Turkish, and write their answers
   into the matching section of `context.md`. Cover: who they are, what they want (with a number
   and a rough date if possible), their route, what they are good at, what gets in their way, and
   how they like to work. Do not interrogate - it is a friendly conversation. Show the updated
   section after each answer so they see it taking shape.
3. **Help find the route if the member is unsure.** If they do not have a route yet, do not push
   them to pick blindly - this is the "we help you find your path" promise of the lesson. Briefly
   recap the four routes from the route lesson:
   - **Proje Ajansı** - solve a concrete business problem as a project; produces strong proof fast.
   - **Ürün** - build your own product or SaaS; scalable, but usually not the fastest first income.
   - **Eğitim** - teach what you know; the winning skill here is communication; scaling is the hard part.
   - **Dönüşüm** - guide a company through its AI transition; proof speaks loudest; needs analysis (the FDE mindset).
   Then ask the route lesson's five decision questions, one at a time, in plain Turkish: (1) Do you
   need fast income? (2) Which of your skills do you want to use? (3) Do you already have a customer
   base? (4) Which kind of load do you want to carry? (5) What should your first move be? Use the
   answers to help them lean toward one route, and write it into `context.md` as a starting point
   they can change later.
4. **Reflect it back.** Once `context.md` is filled, summarize in 2-3 sentences who this person is
   and what they are trying to do. Ask "doğru anladım mı?" and adjust if needed.
5. **Pick the first agent.** Based on their goal and route, suggest 2-3 simple agents that would
   help most, and explain in one line what each would do. Make the route-to-agent link visible with
   examples: Eğitim -> a content or caption agent; Proje Ajansı -> a lead-reply or proposal-draft
   agent; Dönüşüm -> a report or client-email-draft agent; Ürün -> a user-feedback-triage or
   release-notes agent. Let the member choose one. Steer toward something small and useful that
   gives a quick first result (see Quality Bar).
6. **Hand off.** Once an agent is chosen, move to `design-agent.md` to shape it.

## Output
- A filled-in `context.md`.
- A clear decision on which agent to build first.

## Quality Bar
- The first agent should be small enough to finish in one session and useful enough that the
  member sees a real result quickly. A narrow "draft my Instagram captions" agent beats a vague
  "grow my whole business" agent every time.
- `context.md` has a concrete goal, not a wish. "1000 followers in 3 months" is a goal; "be
  successful" is not. Help the member make it concrete.

## Rules & Feedback
- Talk to the member in Turkish, warm and direct, no corporate jargon.
  Why: the audience is Turkish first-time users with no coding background.
  How to apply: every message to the member.
- Do not over-praise their answers ("harika!", "tam da olması gereken bu!" after every reply).
  Why: it feels fake and wastes their time.
  How to apply: acknowledge briefly and move on; save genuine encouragement for real milestones.
- Do not say the words KPI, baseline, scaffold, heartbeat, or non-goal to the member. Ask in plain
  Turkish instead - for a baseline ask "şu an bu sayı kaç?", for a KPI ask "bunun çalıştığını
  hangi sayıdan anlarız?". The English terms stay in the files only.
  Why: the member is a non-coder; the technical words freeze them.
  How to apply: whenever a step would otherwise surface a system-file term to the member.
- Never use an em dash; use a hyphen.
  Why: house style.
  How to apply: every line written for the member.
