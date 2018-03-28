({
    clickCadastrar: function(component, event, helper) {      
        console.log('recordId: '+ component.get("v.recordId"));
        
        var cepFormatado = component.get("v.newAddress.CEP");
        var rua = component.get("v.newAddress.Logradouro");
        var numero = component.get("v.newAddress.Complemento");
        var bairro = component.get("v.newAddress.Bairro");
        var cidade = component.get("v.newAddress.Cidade");
        var uf = component.get("v.newAddress.UF");
                       
        var list = [];
        list.push(cepFormatado);
        list.push(rua);
        list.push(numero);
        list.push(bairro);
        list.push(cidade);
        list.push(uf);
        
        console.log('list: ');
        console.log(list);
        
        var action = component.get("c.upsertAccountAddress");

        action.setParams({
            newAddress : list,
            accountId : component.get("v.recordId"),
        });
                
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                if(response.getReturnValue() == 'error'){
                    component.find('notifLib').showNotice({
                        "variant": "error",
                        "header": "Erro!",
                        "message": response.getReturnValue()
                    });  
                }else{
                    $A.get('e.force:refreshView').fire();
                    alert('Endereço Cadastrado!');
                }                
            }else{
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(action);
    },
    
    digitouCEP: function(component, event, helper) {
        // Formata CEP para ter somente dígitos
        var cep = component.get("v.newAddress.CEP").replace(/\D/g, '');
        
        console.log("O cep digitado foi: "+cep);
        
        // Verifica se campo cep nao está vazio.
        if (cep != "") {
            
            // Expressão regular para validar o CEP.
            var validaCep = /^[0-9]{8}$/;
            
            // Valida o formato do CEP.
            if(validaCep.test(cep)) {
                
                // Preenche os campos com "..." enquanto consulta webservice.
                component.set("v.newAddress.Logradouro", 	"...");
                component.set("v.newAddress.Complemento", 	"...");
                component.set("v.newAddress.Bairro", 		"...");
                component.set("v.newAddress.Cidade", 		"...");
                component.set("v.newAddress.UF", 			"...");
                
                // Consulta a API para pegar o endereço.
                var action = component.get("c.getAddressForCEP");
                action.setParams({
                    "cep": cep
                });
                
                // Cria um callback para quando a resposta for recebida
                action.setCallback(this, function(response) {
                    var state = response.getState();
                    if (state === "SUCCESS") {                        
                        var res = response.getReturnValue(); 
                        
                        if(res.length >= 6){
                            component.set("v.newAddress.CEP",		 	res[0].replace(/\D/g, ''));
                            component.set("v.newAddress.Logradouro", 	res[1]);
                            component.set("v.newAddress.Complemento", 	res[2]);
                            component.set("v.newAddress.Bairro", 		res[3]);
                            component.set("v.newAddress.Cidade",		res[4]);
                            component.set("v.newAddress.UF", 			res[5]);
                        }
                    } else {
                        console.log("Failed with state: " + state);
                    }
                });
                
                // Coloca ação p ser executada de forma assíncrona
                $A.enqueueAction(action);
            } else {
                // Cep é inválido.
                helper.limpaForms(component);
                console.log("Formato de CEP inválido.");
            }
        } else {
            // Cep sem valor, limpa formulário.
            helper.limpaForms(component);
        }
    }
})
