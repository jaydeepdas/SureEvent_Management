public with sharing class EventDetailsController {
  @AuraEnabled
  public static List<Event_Speaker__c> getSpeakers(String eventId) {
    List<Event_Speaker__c> speakerList = [
      SELECT
        Id,
        Name,
        Speaker__c,
        Speaker__r.Name,
        Speaker__r.Phone__c,
        Speaker__r.Email__c
      FROM Event_Speaker__c
      // WHERE Event__c = :eventId
      //WITH SECURITY_ENFORCED
    ];
    return speakerList;
  }

  @AuraEnabled
  public static List< Event__c> getLocationDetails(String eventId) {
    List<Event__c> eventRecord = [
      SELECT
        Id,
        Name__c,
        Location__c,
        Location__r.Name,
        Location__r.City__c,
        Location__r.Country__c,
        Location__r.LandMark__c,
        Location__r.Postal_Code__c,
        Location__r.State__c,
        Location__r.Street__c
      FROM Event__c
      // WHERE Id = :eventId
      // WITH SECURITY_ENFORCED
    ];
    return eventRecord;
  }

  @AuraEnabled
  public static List<Event_Attendee__c> getAttendees(String eventId) {
    List<Event_Attendee__c> eventAttendeeList = [
      SELECT
        Id,
        Name,
        Attendees__c,
        Attendees__r.Name,
        Attendees__r.Email__c,
        Attendees__r.Company_Name__c,
        Attendees__r.Phone__c
      FROM Event_Attendee__c
      // WHERE Event__c = :eventId
      // WITH SECURITY_ENFORCED
    ];
    return eventAttendeeList;
  }
}