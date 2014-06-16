/* Note: LocalStorage is persistent, for things you want to have available
   even if the user leaves the site or restarts their browser. SessionStorage
   is volatile and will be deleted if they restart the browser.*/

(function(wb, Event){

	function handleToggle(evt){
		var button = evt.target;
		var name = button.dataset.target;
		var isOn = !wb.getState(name);
		wb.setState(name, isOn);
		if (isOn){
			button.classList.remove('icon-unchecked');
			button.classList.add('icon-check');
		}else{
			button.classList.add('icon-unchecked');
			button.classList.remove('icon-check');
		}
		Event.trigger(document.body, 'wb-toggle', {name: name, state: isOn});
	}

	Event.on(document.body, 'click', '.toggle:not(.disabled)', handleToggle);

	// initialize toggle states

	function initializeToggleStates(evt){
		wb.findAll(document.body, '.toggle').forEach(function(button){
			var name = button.dataset.target;
			var isOn = wb.getState(name);
			if (isOn){
				button.classList.add('icon-check');
			}else{
				button.classList.add('icon-unchecked');
			}
			Event.trigger(document.body, 'wb-toggle', {name: name, state: isOn});
		});
	}

	Event.once(document.body, 'wb-workspace-initialized', null, initializeToggleStates);

})(wb, Event);