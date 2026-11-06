# Implementation Plan: Desktop-Optimized CBT Thought Record & Clinical Data Analysis

Rethinking and implementing an elevated web-specific user experience on the main CBT Thought Record dashboard, incorporating an aligned interactive neural canvas with docked quick-start, removing redundant top-right controls, and introducing a clinical CBT data analysis suite.

---

## 1. Top Bar Simplification
- **File:** `src/components/CBTExperienceView.tsx`
- **Action:** Remove the `+ New` button on the top-right of the header.
- **Result:** A clean, distraction-free header with only the `Back to Self Care` navigation on the left, the centered activity title with the brain badge, and a balanced right spacer.

---

## 2. Full-Width Interactive Neural Canvas with Docked Quick-Start
- **File:** `src/components/CBTExperienceView.tsx`
- **Layout:**
  - Create a cohesive, full-width desktop hero container with aligned height across both sections:
    - **Left Section (Interactive Neural Canvas):** Displays the living multi-lobed anatomical brain graphic (`BrainActivityPatternGraphic`) with gyri/sulcal folds, live stage progression, touch/drag gesture controls, and real-time layman telemetry.
    - **Right Section (Docked Quick-Start):** Sits at the exact same matching height, featuring:
      - Title: "Catch Automatic Thoughts & Form Balanced Perspectives"
      - Time commitment: "~3 mins guided reflection"
      - Cognitive benefit points: Belief de-escalation, distortion tagging, and prefrontal fact checking.
      - Prominent primary action button: `Start Thought Record (~3 mins)`.

---

## 3. Clinical CBT Data Analysis Suite (Desktop-Specific)
- **New Component:** `src/components/ClinicalCBTAnalysisSuite.tsx`
- **Purpose:** Analyze the patient's logged thought records from a rigorous clinical perspective (Disha/Nainika clinical guidelines) while keeping insights layman-friendly and actionable for the student.
- **Sections:**
  1. **Cognitive Reappraisal Efficacy & Neuro-Emotional Shift:**
     - Quantitative analysis of anxiety conviction drops across sessions (average −48% relief).
     - Breakdown of initial emotional intensity vs. post-reframe relief.
  2. **Distortion Trap Frequency & Habitual Cognitive Patterns:**
     - Clinical breakdown of the patient's most frequent cognitive distortions (e.g., Catastrophizing at 67%, All-or-Nothing at 50%).
     - Explanation of why these specific cognitive loops activate under academic pressure.
  3. **Visceral Somatic Symptom Correlation:**
     - Mapping of physical body cues (shallow breathing, tight chest, rapid heartbeat) to situational triggers and peak worry hours (10 PM – 1 AM).
  4. **Therapist Clinical Observations & Socratic Prescription:**
     - Clinical recommendations for the student to practice between appointments.
     - Notes pre-formatted for upcoming sessions with campus counselors (Disha / Nainika).

---

## 4. Verification & Testing
1. Verify layout across desktop viewports (1440px, 1280px) and mobile viewports (< 768px).
2. Confirm the top-right button is removed and all elements align in height and visual harmony.
3. Run `lint_applet` and `compile_applet` to ensure zero compilation or TypeScript errors.
4. Verify dev server status via `restart_dev_server`.
