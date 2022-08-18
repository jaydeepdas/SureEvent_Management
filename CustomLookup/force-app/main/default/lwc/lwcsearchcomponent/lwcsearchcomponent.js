import { LightningElement, api, track } from 'lwc';

export default class Lwcsearchcomponent extends LightningElement {

    @track searckKeyword;
    @api isrequired = 'false';
    @api searchLabel = 'Search Account';
    @api showLabel   = 'true';

    /* Check the isrequired prop is true then set the prop to true*/
    renderedCallback() {
        if ( this.isrequired === "false" )
            return;
        if ( this.isrequired === "true") {
            let picklistInfo = this.template.querySelector('lightning-input');
            picklistInfo.required = true;
            this.isrequired = "false";
        }
        
    }

    handleChange(event) {
        var keyword = event.target.value;
        /* Create & dispatch the event to parent component with the search keyword */
        if ( keyword && keyword.length >= 2 ) {
            let searchEvent = new CustomEvent('search',{
                detail : { value : keyword }
            });
            this.dispatchEvent(searchEvent);
        }
        
    }
}