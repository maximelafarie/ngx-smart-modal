<a name="7.1.0"></a>
# 7.1.0 (Oct 4, 2018)

### Bug Fixes
* Fix hasData return while data is false when casted as a boolean (pull #128, fixes #127)
* Fix an addresses keyup issue (pull #141)
* Fix remaining body class even if no modal is opened (pull #143, fixes #119)
* Fix hasData() method returning undefined value after setData (pull #143, fixes #108)


<a name="7.0.0"></a>
# 7.0.0 (Jul 16, 2018)

### Features
* **BREAKING CHANGES**: refactor modal templating with new selectors and containers (DOM)
* Fix lint, refactor ngClass
* Add an option to display the modal at the location of a target element
* Add custom class to center a modal vertically
* Replaced Angular cycle checks timeouts by observables


<a name="6.0.0"></a>
# 6.0.0 (Jul 16, 2018)

### Features
* **BREAKING CHANGES**: Move modal component style to separated SCSS/CSS files
* Add default animations css class (top, right, bottom, left)
* Add SCSS variables to improve customization possibilities
* Add allowOutsideClick option (pull #84)
* Enhance Events triggering on open and close actions


<a name="5.0.0"></a>
# 5.0.0 (Feb 28, 2018)

### Bug Fixes
* Fix a non-issued error on modal `escapable` (previously `escapeAble`, c.f. Features below) option that wasn't closing the modal on escape event
* Fix a non-issued error on modal `escapable` event that was called in each modal even if not visible. Now it only calls in the visible modals

### Features
* **BREAKING CHANGES**: rename `escapeAble` option to `escapable`
* Create default z-index and check all modals (pull #79)
* Add issue template (pull #80)
* Add allowOutsideClick option (pull #84)
* Rename `allowOutsideClick` option from PR #84 to `dismissable` for more consistency
* Update unit tests
* Update demo dependencies
* Update the demo with `escapable` and `dismissable` options examples


<a name="4.1.0"></a>
# 4.1.0 (Dec 26, 2017)

### Features
* Add events when actions ends (pull #65)


<a name="4.0.0"></a>
# 4.0.0 (Dec 26, 2017)

### Features
* Update demo dependencies
* Update library dependencies
* Update all the library build process with latest tools version


<a name="3.1.0"></a>
# 3.1.0 (Nov 20, 2017)

### Bug Fixes
* Fix modal close / dismiss issue on projects which use `ChangeDetectionStrategy.OnPush`, closes #47
* Fix a non-issued error on modal prototypes functions where Angular check cycle was triggering an error of type : "value changed after it was checked" (e.g.: if you was watching `modal.hasData()` from a component's view).

### Features
* Update project dependencies
* Remove `modalData` from `NgxSmartModalService`
* Update the demo
* Now, each modal has its own **private** `data` property with public accessors (always available from the `NgxSmartModalService`)
* Modal data no more wrapped into an array. This way, retrieving modal data is easier.
* Privatize the `data` of each modal. Accessible by public accessors
* Remove `getAllModalData()` and `resetAllModalData()` from `NgxSmartModalService` because
    - too permissive
    - not very useful given that it could be coded if needed depending on the project needs
    - it was using the `NgxSmartModalService` `modalData` array (no more used)
* Add events `onDataAdded` and `onDataRemoved` on each modal

