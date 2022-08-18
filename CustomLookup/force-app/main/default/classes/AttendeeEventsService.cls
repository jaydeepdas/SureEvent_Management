public with sharing class AttendeeEventsService {
    @AuraEnabled
    public static List<Event_Attendee__c> upcomingEvets(String attendeeId) {
      List<Event_Attendee__c> eventLists = [
        SELECT
          Id,
          Name,
          Event__c,
          Event__r.Location__c,
          Event__r.Location__r.Name,
          Event__r.Organizer__c,
          Event__r.Organizer__r.Name,
          Event__r.Name__c,
          Event__r.Start__c
        FROM Event_Attendee__c
        WHERE
          Attendees__c = :attendeeId
          AND Event__r.Start__c >= today
          AND Event__r.Live__c = true
        WITH SECURITY_ENFORCED
      ];
      return eventLists;
    }
  
    @AuraEnabled
    public static List<Event_Attendee__c> pastEvents(String attendeeId) {
      List<Event_Attendee__c> eventLists = [
        SELECT
          Id,
          Name,
          Event__c,
          Event__r.Location__c,
          Event__r.Location__r.Name,
          Event__r.Organizer__c,
          Event__r.Organizer__r.Name,
          Event__r.Name__c,
          Event__r.Start__c
        FROM Event_Attendee__c
        WHERE Attendees__c = :attendeeId AND Event__r.Start__c < today
        WITH SECURITY_ENFORCED
      ];
      return eventLists;
    }
  }
  