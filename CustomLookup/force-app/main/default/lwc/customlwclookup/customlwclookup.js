import { LightningElement, api, track } from 'lwc';
import searchRecords from '@salesforce/apex/CustomSearchController.searchRecords';
export default class Customlwclookup extends LightningElement {

    /* public property */
    /* these public property will be used when using this component inside other component for the lookup functionality */
    /* objectName is the name of the Object which is parent either master-detail or lookup */
    /* fieldName is the field of parent object in which text needs to be searched */
    /* iconname - icon to display in the list and after selection of the record */
    /* label - to show the label for the lookup */
    /* parentidfield - the apiname of lookup/matser-detail in the child object this field is useful to indentify which parent record has been select if there are multiple lookup for a single child record */
    @api objectName = 'Account';
    @api fieldName  = 'Name';
    @api iconname   = 'standard:record';
    @api label      = 'Account';
    @api parentidfield = 'AccountId';

    /* private property */
    @track records;
    @track selectedRecord;

    hanldeSearch(event) {

        var searchVal = event.detail.value;

        searchRecords({
            objName   : this.objectName,
            fieldName : this.fieldName,
            searchKey : searchVal
        })
        .then( data => {
            if ( data ) {
                let parsedResponse = JSON.parse(data);
                let searchRecordList = parsedResponse[0];
                for ( let i=0; i < searchRecordList.length; i++ ) {
                      let record = searchRecordList[i];
                      record.Name = record[this.fieldName];
                }
                //window.console.log(' data ', searchRecordList);
                this.records = searchRecordList;
            }
        })
        .catch( error => {
            window.console.log(' error ', error);
        });
    }

    handleSelect(event) {
        var selectedVal = event.detail.selRec;
        this.selectedRecord =  selectedVal;
        let finalRecEvent = new CustomEvent('select',{
            detail : { selectedRecordId : this.selectedRecord.Id, parentfield : this.parentidfield }
        });
        this.dispatchEvent(finalRecEvent);
    } 

    handleRemove() {
        this.selectedRecord =  undefined;
        this.records = undefined;
        let finalRecEvent = new CustomEvent('select',{
            detail : { selectedRecordId : undefined, parentfield : this.parentidfield }
        });
        this.dispatchEvent(finalRecEvent);
    }
    
}