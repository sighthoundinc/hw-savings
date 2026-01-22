# Changelog

All notable changes to this project are documented in this file.

This project uses date-based entries rather than semantic version numbers. Dates are in UTC.

## 2026-01-22

### Added
- Visual emphasis styling for the Scenario A savings card, with green/red states that track savings vs extra cost while preserving existing math.
- Smooth fade transitions for scenario-specific sections (smart cameras, reuse cameras, new deployments) to avoid jarring content snaps.
- Value-change highlighting on key result cards so users can immediately see which parts of the output respond to each input.
- Always-visible standard IP camera cost input so hardware assumptions remain explicit even when existing cameras are reused.
- Improved print/PDF layout that stacks results above inputs and adds a page break before the **Your setup** section.
- Sighthound black logo in the print/export header for branded estimates.

### Changed
- Tightened spacing between the primary cost and deployment detail cards to keep the desktop view compact and aligned.
- Standardized breakdown math copy to use `x` between quantity and unit price (for example, `Compute Nodes: 3 x $3,500.00 = $10,500.00`).
- Updated software labels and copy to "Your software costs (recurring)" and ensured monthly vs annual wording is consistent across summary and breakdown.

### Infrastructure
- GitHub Actions workflow to run the calculator tests on pushes and pull requests.

## 2026-01-16

### Added
- Animated state changes for results, making savings and deployment details feel more responsive during live demos.
- PDF export of the current calculator scenario so results can be shared or attached to follow-up emails.

### Changed
- Updated GitHub Pages configuration and links so the public URL points to the canonical hosted calculator.

## 2026-01-14

### Added
- Optional monthly software comparison that lets users enter a per-camera software cost and compare it with Sighthound software pricing.
- Centralized core calculator math into shared functions to keep calculations and unit tests aligned.
- Support documentation for embedding the calculator via GitHub Pages and Squarespace `<iframe>` embeds.

### Changed
- Clarified calculator input labels and helper copy, especially around the optional software comparison.
- Removed a duplicate estimator heading that appeared in the Squarespace embed layout.

## 2026-01-09

### Added
- Dark mode theme toggle and supporting visual assets.
- "Reset calculations" control that returns inputs and URL parameters to their defaults.

### Changed
- Reordered result cards so absolute costs appear before the savings callout, making the story easier to follow in demos.
- Expanded README documentation for the hardware savings calculator behavior and assumptions.

## 2026-01-08

### Added
- Initial savings calculator scaffold as a static single-page app with baseline inputs and results.

### Changed
- Frozen baseline calculator math and UI as a reference point before broader layout and UX iterations.
