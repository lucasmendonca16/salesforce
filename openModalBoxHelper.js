({  
	openModalBox:function(component,event,helper) {
		var modal = component.find('modalId');
		var backdrop = component.find('backdropId');
        
        // A ordem em que o modal (1o) e o backdrop (2o) são adicionados é importante.
        // Só altere se souber muito bem o que estiver fazendo
		$A.util.addClass(modal, 'slds-fade-in-open');
		$A.util.addClass(backdrop, 'slds-backdrop--open'); 
	},
    
    closeModalBox:function(component,event,helper){    
		var modal = component.find('modalId');
		var backdrop = component.find('backdropId');
        
        // A ordem em que o backdrop (1o) e o modal (2o) são removidos é importante. 
        // Só altere se souber muito bem o que estiver fazendo
		$A.util.removeClass(backdrop,'slds-backdrop--open');
		$A.util.removeClass(modal, 'slds-fade-in-open'); 
    }
})
