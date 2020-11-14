class ProxyFactory {
    // Não é obrigatório, mas um padrão comum no uso de factory é utilizar um método estático para não ter que instanciar a classe
    static create(objeto, props, acao) {
        return new Proxy(objeto, {

            // Não pode ser arrow function porque precisa do escopo de função
            get(target, prop, receiver) {
                if (props.includes(prop) && ProxyFactory._ehFuncao(target[prop])) {
                    return function() {
                        console.log(`interceptando ${prop}`);
                        Reflect.apply(target[prop], target, arguments);
                        return acao(target);
                    }
                }

                return Reflect.get(target, prop, receiver);
            },

            set(target, prop, value, receiver) {
                if (props.includes(prop)) {
                    acao(target);
                }
                
                return Reflect.set(target, prop, value, receiver);
            }
        });
    }

    static _ehFuncao(func) {
        return typeof(func) === typeof(Function);
    }
}