export class Contato{

    //atributos privados
    #ID;
    #nome;
    #email;
    #telefone;

    //construtor da classe
    constructor(ID, nome, email, telefone){
        this.#ID = ID;
        this.#nome = nome;
        this.#email = email;
        this.#telefone = telefone;
    }

    // metodo para exportar os dados do objeto no formato diconario (objeto simples)
    toJSON(){
        return{
            ID: this.#ID,
            nome: this.#nome,
            email: this.#email,
            telefone: this.#telefone
        }
    }


    //metodos da classe

    #checarStr(str){
        if (typeof str !== "string" || str.trim().length === 0){
            return false
        } else {
            return true;
        }
    }

    #checarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);
    }


    #checarTelefone(telefone) {
    const regex = /^(\(?\d{2}\)?\s?)?9\d{4}-?\d{4}$/;
    return regex.test(telefone);
  }

    //getters e setters

    get ID(){
        return this.#ID;
    }

    get nome(){
        return this.#nome;
    }

    set nome(nome){
        if (this.#checarStr(nome)) {
            this.#nome = nome;
        } else {
            console.log("Nome inválido!");
            return;
        }
    }

    get email(){
        return this.#email;
    }

    set email(email){

        if (this.#checarEmail(email)){
            this.#email = email;
        } else {
            console.log("Email inválido!")
        }
    }

    get telefone(){
        return this.#telefone;
    }

    set telefone(telefone){
        if(this.#checarTelefone(telefone)){
            this.#telefone = telefone;
        } else {
            console.log("Telefone inválido!");
        }
    }

}