// CSL locators model
// A locator is a simple key-value object, where the value is some potentially discontinuos list of numbers and/or strings.
// Examples:
//   - page 1
//   - page 23, 25-36
//   - chapter IV

type Locator = (string | number | number[]);

// REVIEW this approach is more human-friendly, but maybe better to just have explicit type/value properties?
// In any case, this is just a place holder ATM.
interface Locators {
    pages?: Locator;
    chapter?: Locator;
}
