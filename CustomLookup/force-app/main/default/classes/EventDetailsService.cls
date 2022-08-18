public with sharing class EventDetailsService {
  @AuraEnabled
  public static List<Event__c> upcomingEvents() {
    List<Event__c> eventList = [
      SELECT Id, Name, Name__c,Event_Detail__c,Location__c,Location__r.Name,Organizer__c,Start__c,Organizer__r.Name FROM Event__c
      WHERE Start__c >= Today AND Live__c = true
      WITH SECURITY_ENFORCED
    ];
    return eventList;
  }
}
