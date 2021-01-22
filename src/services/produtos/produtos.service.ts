import { Injectable } from '@nestjs/common';
import firebase from 'firebase';
import _ from "underscore";
import { Guid } from "guid-typescript";

import firebaseConfig from 'src/firebase-config';
import { Produto } from 'src/models/produto.model';

firebase.initializeApp(firebaseConfig.config());

const database = firebase.database();

@Injectable()
export class ProdutosService {

    getPodutos(): Promise<Array<Produto>> {
        let list: Array<Produto> = [];
        try {
            return new Promise((ressolve, reject) => {
                database.ref('produtos').once('value')
                    .then(snapshot => {
                        _.each(snapshot.val(), (i, ind) => {
                            if (i != null) {
                                list.push(i);
                            }
                        });
                        ressolve(snapshot.val() == null ? [] : list);
                    }, error => {
                        reject(error);
                    })
            })
        } catch (erro) {
            throw erro;
        }
    }

    getPodutosById(id): Promise<Produto> {
        try {
            return new Promise((ressolve, reject) => {
                database.ref('produtos').once('value')
                    .then(snapshot => {
                        let index = snapshot.val().map(function (e) { return e.id; }).indexOf(id);
                        database.ref(`produtos/${index}`).once('value')
                            .then(snapshot => {
                                ressolve(snapshot.val() == null ? {} : snapshot.val());
                            }, error => {
                                reject(error);
                            })
                    }, error => {
                        reject(error);
                    })
            })
        } catch (erro) {
            throw erro;
        }
    }

    postPodutos(produto: Produto): Promise<any> {
        try {
            return new Promise((ressolve, reject) => {
                let obj = produto;
                let retorno;

                obj.id = Guid.create().toString();

                database.ref('produtos').once('value')
                    .then(snapshot => {
                        retorno = snapshot.val();
                        retorno == null ? retorno = [obj] : retorno.push(obj);

                        database.ref("produtos").set(retorno, error => {
                            if (error) {
                                reject(error);
                                console.log("Failed with error: " + error)
                            } else {
                                ressolve({ mensagem: 'Produto cadastrodo com sucesso.' });
                            }
                        })
                    }, error => {
                        reject(error);
                    })
            })
        } catch (erro) {
            throw erro;
        }
    }

    putProduto(produto): Promise<any> {
        try {
            return new Promise((ressolve, reject) => {

                database.ref('produtos').once('value')
                    .then(snapshot => {
                        _.each(snapshot.val(), (i, ind) => {
                            if (i != undefined) {
                                if (i.id == produto.id) {
                                    database.ref(`produtos/${ind}`).set(produto, error => {
                                        if (error) {
                                            reject(error);
                                            console.log("Failed with error: " + error)
                                        } else {
                                            ressolve({ mensagem: 'Produto alterado com sucesso.' });
                                        }
                                    })
                                }
                            }
                        });
                    }, error => {
                        reject(error);
                    })
            })
        } catch (erro) {
            throw erro;
        }
    }

    deleteProduto(id): Promise<any> {
        try {
            return new Promise((ressolve, reject) => {
                database.ref('produtos').once('value')
                    .then(snapshot => {
                        _.each(snapshot.val(), (i, ind) => {
                            if (i != undefined) {
                                if (i.id == id) {
                                    database.ref(`produtos/${ind}`).remove();
                                    ressolve({ mensagem: 'Produto excluido com sucesso.' });
                                }
                            }
                        });
                    }, error => {
                        reject(error);
                    })
            })
        } catch (erro) {
            throw erro;
        }
    }

}
