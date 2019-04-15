// API for HTMLInputElement at https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement
class JSONInputElement extends HTMLInputElement {
        // Want to see if the value attribute the user puts into the input
        // is valid JSON
        static get observedAttributes() { return ["value"] };

        constructor() {
                super();
        }

        // Overrides the method for the HTMLInputElement class to handle JSON
        checkValidity(json_string) {
                try {
                        JSON.parse(json_string)
                } catch (e) {
                        return false;
                }
                return true;
        }

        // Comparing the validity of the oldValue versus the newValue
        attributeChangedCallback(name, oldValue, newValue) {
                oldValidity = this.checkValidity(oldValue);
                newValidity = this.checkValidity(newValue);
                if !oldValidity && newValidity {
                        console.log("The new JSON value is valid, but not the old.");
                } else if oldValidity && !newValidity {
                        console.log("The old JSON value is valid, but not the new.");
                } else if oldValidity && newValidity {
                        console.log("Both the old & new JSON values are valid.");
                } else if !oldValidity && !newValidity {
                        console.log("Neither the old or new JSON values are valid.");
                }
        }
}

// Since this extends an element, we need to mention that upon adding it
customElements.define("json-input", JSONInputElement, { extends: "input" });
