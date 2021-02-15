/**
 * Wrapps events to add support in all browsers
 */
const EventsFactory = {

  

  createNewEvent(eventName) {
    let event = '';
    
    if (typeof(Event) === 'function') {
        event = new Event(eventName);
    } else {
        event = document.createEvent('Event');
        event.initEvent(eventName, true, true);
    }
    
    return event;
  }     
};
  
export default EventsFactory;