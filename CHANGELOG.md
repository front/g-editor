# g-editor changelog

## 1.2.0

### Added
- Support for frontend scripts

### Changed
- Fixed default public URL on production build


## 1.1.0

### Added
- Allow a target build folder to be set with an environment var

### Changed
- Only send essential folders to NPM


## 1.0.0

### Changed
- Removed Gutenberg-JS dependency
- Added scripts from Gutenberg-js
- Load Gutenberg packages directly


## 0.4.0

### Added
- Added fake data for taxonomies, categories and users.
- Added button to clear local storage manually instead of clearing on bootup.
- Implemented basic image upload to memory.
- Added changelog.

### Changed
- Updated Gutenberg-JS dependency to the latest version (4.0.0).
- Local storage is no longer cleared on bootup. This makes it possible to test blocks that were pre-saved for consistency and deprecated markup.
- Refactored API Fetch function to cover more WP API Endpoints.
