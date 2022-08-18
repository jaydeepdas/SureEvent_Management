import { LightningElement, track } from "lwc";
import upcomingEvents from "@salesforce/apex/EventDetailsService.upcomingEvents";
const columns = [
  {
    label: "View",
    fieldName: "detailsPage",
    type: "url",
    wrapText: "true",
    typeAttributes: {
      label: {
        fieldName: "Name__c"
      },
      target: "_self"
    }
  },
  {
    label: "Name",
    fieldName: "Name__c",
    wrapText: "true",
    cellAttributes: {
      iconName: "standard:event",
      iconPosition: "left"
    }
  },
  {
    label: "Name",
    fieldName: "EVNT_ORG",
    wrapText: "true",
    cellAttributes: {
      iconName: "standard:user",
      iconPosition: "left"
    }
  },
  {
    label: "Location",
    fieldName: "Location",
    wrapText: "true",
    type: "text",
    cellAttributes: {
      iconName: "utility:location",
      iconPosition: "left"
    }
  }
];

export default class EventList extends LightningElement {
  columnsList = columns;
  error;
  startdattime;
  @track result;
  @track recordsToDisplay;

  connectedCallback() {
    this.upcomingEventsFromApex();
  }

  upcomingEventsFromApex() {
    upcomingEvents()
      .then((data) => {
        window.console.log(" event list ", data);
        data.forEach((record) => {
          record.detailsPage =
            "https://" + window.location.host + "/" + record.Id;
          record.EVNT_ORG = record.Organizer__r.Name;
          if (record.Location__c) {
            record.Location = record.Location__r.Name;
          } else {
            record.Location = "This is Virtual Event";
          }
        });

        this.result = data;
        this.recordsToDisplay = data;
        this.error = undefined;
      })
      .catch((err) => {
        window.console.log(err);
        this.error = JSON.stringify(err);
        this.result = undefined;
      });
  }

  handleSearch(event) {
    let keyword = event.detail.value;

    let filteredEvents = this.result.filter((record, index, arrayobject) => {
      return record.Name__c.toLowerCase().includes(keyword.toLowerCase()); 
    });
    if (keyword && keyword.length >= 2) {
      this.recordsToDisplay = filteredEvents;
    } else {
      this.recordsToDisplay = this.result;
    }
    
  }

  handleStartDate(event) {
    let valuedatetime = event.target.value;

    let filteredEvents = this.result.filter((record, index, arrayobject) => {
      return record.Start__c >= valuedatetime;
    });
    this.recordsToDisplay = filteredEvents;
  }
  handleLocationSearch(event) {
    let keyword = event.detail.value;

    let filteredEvents = this.result.filter((record, index, arrayobject) => {
      return record.Location.toLowerCase().includes(keyword.toLowerCase());
    });
    if (keyword && keyword.length >= 2) {
      this.recordsToDisplay = filteredEvents;
    } else {
      this.recordsToDisplay = this.result;
    }
  }
}
