/*
	As funções openModalBox e closeModalBox estão implementadas no
    helper em vez de no controller, pois, caso futuramente seja necessário 
    criar uma função auxiliar que chame openModalBox ou closeModalBox, 
    será possível fazê-lo sem mensagens de erro nem problemas de dependência.
*/

({
	openModal: function(component,event,helper) {
      	helper.openModalBox(component, event, helper);
    },

    closeModal:function(component,event,helper){    
		helper.closeModalBox(component, event, helper);
    }
})
