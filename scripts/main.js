// Global variable containing all the Dataset
var nutData;
var fasceEta = [0, 0, 0, 0, 0];
var fasceStipendio = [0, 0, 0, 0, 0];
var idpersona = [];
var idpSalary = [];
var lastId = null;
var caddy1 = [];
var caddy2 = [];
var fEta = ["20-29", "30-39", "40-49", "50-59", "60+"];
var fStipendio = ["0-2000", "2000-4000", "4000-6000", "6000-8000", "8000+"];

var controlloDati = [false, false, false, false, false]; //gruppo 1, gruppo 2, gruppo 3, gruppo 4, gruppo 5


var asseX = "anni";
var lchart1 = "5C";
var lchart2 = "TL";

function calculateAgeArray(subject, eta) {
    var flag = false;
    for (var i = 0; i < idpersona.length; i++) {
        if (subject == idpersona[i]) { // controllo l'esistenza della persona nell'array IDENTIFICA la persona UNIVOCA
            flag = true;
        }
    }
    if (flag == false) {
        idpersona.push(subject);
        if (eta < 30) {
            fasceEta[0]++; // 20+ perché abbiamo controllato che non esistono persone di meno di 20 anni
        } else if (eta < 40) {
            fasceEta[1]++; //30+
        } else if (eta < 50) {
            fasceEta[2]++; // 40+
        } else if (eta < 60) {
            fasceEta[3]++; // 50+
        } else {
            fasceEta[4]++; // 60+
        }
    }
}

function calculateSalaryArray(subject, stipendio) {
    var flag = false;
    for (var i = 0; i < idpSalary.length; i++) {
        if (subject == idpSalary[i]) { // controllo l'esistenza della persona nell'array IDENTIFICA la persona UNIVOCA
            flag = true;
        }
    }
    if (flag == false) {
        idpSalary.push(subject);
        if ((stipendio.localeCompare("0_1000") == 0) || (stipendio.localeCompare("1000_2000") == 0)) {
            fasceStipendio[0]++;
        } else if ((stipendio.localeCompare("2000_3000") == 0) || (stipendio.localeCompare("3000_4000") == 0)) {
            fasceStipendio[1]++;
        } else if ((stipendio.localeCompare("4000_5000") == 0) || (stipendio.localeCompare("5000_6000") == 0)) {
            fasceStipendio[2]++;
        } else if ((stipendio.localeCompare("6000_7000") == 0) || (stipendio.localeCompare("7000_8000") == 0)) {
            fasceStipendio[3]++;
        } else {
            fasceStipendio[4]++; // 8000_plus
        }
    }
}

function calculateNumberOfProducts(nutData) {
    var univokeProducts = [];
    var product = { id: "", pricekgl: "", name: "", score: "" };
    product["id"] = nutData[0].CODE;
    product["pricekgl"] = nutData[0].PRICE_KG_L;
    product["name"] = nutData[0].PRODUCT;
    product["score"] = nutData[0].SCORE;
    product["kcal100g"] = nutData[0].KCAL_100G;
    product["lipides100g"] = nutData[0].LIPIDES_100G;
    product["ags100g"] = nutData[0].AGS_100G;
    product["glucides100g"] = nutData[0].GLUCIDES_100G;
    product["sucres100g"] = nutData[0].SUCRES_100G;
    product["proteines100g"] = nutData[0].PROTEINES_100G;
    product["sel100g"] = nutData[0].SEL_100G;
    product["fibres100g"] = nutData[0].FIBRES_100G;
    product["nutriscore_letter"] = nutData[0].NUTRISCORE[1];

    univokeProducts.push(product);
    for (var i = 1; i < nutData.length; i++) {
        var exist = false;
        var product = { id: "", price: "", name: "", score: "" };
        for (var j = 0; j < univokeProducts.length; j++) {

            // if ((univokeProducts[j].localeCompare(nutData[i].CODE)) == 0) {
            //     exist = true;
            //     break;
            // }
            if (univokeProducts[j]["id"] == nutData[i].CODE) {
                exist = true;
                break;
            }

        }
        if (exist == false) {
            product["id"] = nutData[i].CODE;
            product["pricekgl"] = nutData[i].PRICE_KG_L;
            product["name"] = nutData[i].PRODUCT;
            product["score"] = nutData[i].SCORE;
            product["kcal100g"] = nutData[i].KCAL_100G;
            product["lipides100g"] = nutData[i].LIPIDES_100G;
            product["ags100g"] = nutData[i].AGS_100G;
            product["glucides100g"] = nutData[i].GLUCIDES_100G;
            product["sucres100g"] = nutData[i].SUCRES_100G;
            product["proteines100g"] = nutData[i].PROTEINES_100G;
            product["sel100g"] = nutData[i].SEL_100G;
            product["fibres100g"] = nutData[i].FIBRES_100G;
            product["nutriscore_letter"] = nutData[i].NUTRISCORE[1];
            univokeProducts.push(product);
        }
    }
    //console.log(univokeProducts);
    return univokeProducts;
}

function initInfo() {
    document.getElementById("name").innerHTML = "-";
    document.getElementById("score").innerHTML = "-";
    document.getElementById("pricekgl").innerHTML = "-";
    document.getElementById("energy").innerHTML = "-";
    document.getElementById("protein").innerHTML = "-";
    document.getElementById("glucides").innerHTML = "-";
    document.getElementById("sucres").innerHTML = "-";
    document.getElementById("lipides").innerHTML = "-";
    document.getElementById("ags").innerHTML = "-";
    document.getElementById("fibers").innerHTML = "-";
    document.getElementById("salt").innerHTML = "-";



}

function loadInfo(nutProducts, dotId) {
    for (var i = 0; i < nutProducts.length; i++) {
        if (nutProducts[i].id == dotId) {
            document.getElementById("name").innerHTML = nutProducts[i].name;
            document.getElementById("score").innerHTML = nutProducts[i].score;
            document.getElementById("pricekgl").innerHTML = nutProducts[i].pricekgl + " €";
            document.getElementById("energy").innerHTML = nutProducts[i].kcal100g + " kcal";
            document.getElementById("protein").innerHTML = nutProducts[i].proteines100g + " g";
            document.getElementById("glucides").innerHTML = nutProducts[i].glucides100g + " g";
            document.getElementById("sucres").innerHTML = nutProducts[i].sucres100g + " g";
            document.getElementById("lipides").innerHTML = nutProducts[i].lipides100g + " g";
            document.getElementById("ags").innerHTML = nutProducts[i].ags100g + " g";
            document.getElementById("fibers").innerHTML = nutProducts[i].fibres100g + " g";
            document.getElementById("salt").innerHTML = nutProducts[i].sel100g + " g";

        }
    }
}

function caddyFilterBought(nutData) {
    // verifica che non ci siano prodotti in più o in meno tra i due esperimenti: con etk o senza etk
    caddy1 = [];
    caddy2 = [];
    var senzaetk = 0;
    var conetk = 0;
    for (var i = 0; i < nutData.length; i++) {
        if (nutData[i].BOUGHTPRODUCT >= 1) {
            if (nutData[i].CADDY == 1) {
                caddy1[senzaetk] = nutData[i];
                senzaetk++;
            } else if (nutData[i].CADDY == 2) {
                caddy2[conetk] = nutData[i];
                conetk++;
            } else { // se mai esistesse un CADDY diverso da 1 e 2
                //console.log(nutData[i]);
            }
        }
    }
    // console.log(caddy1);
    // console.log(caddy2);
}


function conversioneInDataset(A, B, C, D, E) {
    // creo array bidimensionale (array di array)
    var dataset = [];

    dataset[0] = A;
    dataset[1] = B;
    dataset[2] = C;
    dataset[3] = D;
    dataset[4] = E;

    //console.log(dataset);
    return dataset;
}


function filterAge(nutData, etichetta) {
    caddyFilterBought(nutData);

    var A = [0, 0, 0, 0, 0];
    var B = [0, 0, 0, 0, 0];
    var C = [0, 0, 0, 0, 0];
    var D = [0, 0, 0, 0, 0];
    var E = [0, 0, 0, 0, 0];

    controlloDati = [false, false, false, false, false];

    for (var i = 0; i < caddy1.length; i++) {
        if (caddy1[i].TREATMENT.localeCompare(etichetta) == 0) {
            if (caddy1[i].NUTRISCORE[1].localeCompare("A") == 0) {
                if (caddy1[i].AGE < 30) {
                    A[0] -= caddy1[i].QUANTITY; // 20+ perché abbiamo controllato che non esistono persone di meno di 20 anni
                    controlloDati[0] = true;
                } else if (caddy1[i].AGE < 40) {
                    A[1] -= caddy1[i].QUANTITY; //30+
                    controlloDati[1] = true;
                } else if (caddy1[i].AGE < 50) {
                    A[2] -= caddy1[i].QUANTITY; // 40+
                    controlloDati[2] = true;
                } else if (caddy1[i].AGE < 60) {
                    A[3] -= caddy1[i].QUANTITY; // 50+
                    controlloDati[3] = true;
                } else {
                    A[4] -= caddy1[i].QUANTITY; // 60+
                    controlloDati[4] = true;
                }

            } else if (caddy1[i].NUTRISCORE[1].localeCompare("B") == 0) {
                if (caddy1[i].AGE < 30) {
                    B[0] -= caddy1[i].QUANTITY; // 20+ perché abbiamo controllato che non esistono persone di meno di 20 anni
                    controlloDati[0] = true;
                } else if (caddy1[i].AGE < 40) {
                    B[1] -= caddy1[i].QUANTITY; //30+
                    controlloDati[1] = true;
                } else if (caddy1[i].AGE < 50) {
                    B[2] -= caddy1[i].QUANTITY; // 40+
                    controlloDati[2] = true;
                } else if (caddy1[i].AGE < 60) {
                    B[3] -= caddy1[i].QUANTITY; // 50+
                    controlloDati[3] = true;
                } else {
                    B[4] -= caddy1[i].QUANTITY; // 60+
                    controlloDati[4] = true;
                }
            } else if (caddy1[i].NUTRISCORE[1].localeCompare("C") == 0) {
                if (caddy1[i].AGE < 30) {
                    C[0] -= caddy1[i].QUANTITY; // 20+ perché abbiamo controllato che non esistono persone di meno di 20 anni
                    controlloDati[0] = true;
                } else if (caddy1[i].AGE < 40) {
                    C[1] -= caddy1[i].QUANTITY; //30+
                    controlloDati[1] = true;
                } else if (caddy1[i].AGE < 50) {
                    C[2] -= caddy1[i].QUANTITY; // 40+
                    controlloDati[2] = true;
                } else if (caddy1[i].AGE < 60) {
                    C[3] -= caddy1[i].QUANTITY; // 50+
                    controlloDati[3] = true;
                } else {
                    C[4] -= caddy1[i].QUANTITY; // 60+
                    controlloDati[4] = true;
                }
            } else if (caddy1[i].NUTRISCORE[1].localeCompare("D") == 0) {
                if (caddy1[i].AGE < 30) {
                    D[0] -= caddy1[i].QUANTITY; // 20+ perché abbiamo controllato che non esistono persone di meno di 20 anni
                    controlloDati[0] = true;
                } else if (caddy1[i].AGE < 40) {
                    D[1] -= caddy1[i].QUANTITY; //30+
                    controlloDati[1] = true;
                } else if (caddy1[i].AGE < 50) {
                    D[2] -= caddy1[i].QUANTITY; // 40+
                    controlloDati[2] = true;
                } else if (caddy1[i].AGE < 60) {
                    D[3] -= caddy1[i].QUANTITY; // 50+
                    controlloDati[3] = true;
                } else {
                    D[4] -= caddy1[i].QUANTITY; // 60+
                    controlloDati[4] = true;
                }
            } else if (caddy1[i].NUTRISCORE[1].localeCompare("E") == 0) {
                if (caddy1[i].AGE < 30) {
                    E[0] -= caddy1[i].QUANTITY; // 20+ perché abbiamo controllato che non esistono persone di meno di 20 anni
                    controlloDati[0] = true;
                } else if (caddy1[i].AGE < 40) {
                    E[1] -= caddy1[i].QUANTITY; //30+
                    controlloDati[1] = true;
                } else if (caddy1[i].AGE < 50) {
                    E[2] -= caddy1[i].QUANTITY; // 40+
                    controlloDati[2] = true;
                } else if (caddy1[i].AGE < 60) {
                    E[3] -= caddy1[i].QUANTITY; // 50+
                    controlloDati[3] = true;
                } else {
                    E[4] -= caddy1[i].QUANTITY; // 60+
                    controlloDati[4] = true;
                }
            }
        }

    }
    for (var i = 0; i < caddy2.length; i++) {
        if (caddy2[i].TREATMENT.localeCompare(etichetta) == 0) {
            if (caddy2[i].NUTRISCORE[1].localeCompare("A") == 0) {
                if (caddy2[i].AGE < 30) {
                    A[0] += caddy2[i].QUANTITY; // 20+ perché abbiamo controllato che non esistono persone di meno di 20 anni
                    controlloDati[0] = true;
                } else if (caddy2[i].AGE < 40) {
                    A[1] += caddy2[i].QUANTITY; //30+
                    controlloDati[1] = true;
                } else if (caddy2[i].AGE < 50) {
                    A[2] += caddy2[i].QUANTITY; // 40+
                    controlloDati[2] = true;
                } else if (caddy2[i].AGE < 60) {
                    A[3] += caddy2[i].QUANTITY; // 50+
                    controlloDati[3] = true;
                } else {
                    A[4] += caddy2[i].QUANTITY; // 60+
                    controlloDati[4] = true;
                }

            } else if (caddy2[i].NUTRISCORE[1].localeCompare("B") == 0) {
                if (caddy2[i].AGE < 30) {
                    B[0] += caddy2[i].QUANTITY; // 20+ perché abbiamo controllato che non esistono persone di meno di 20 anni
                    controlloDati[0] = true;
                } else if (caddy2[i].AGE < 40) {
                    B[1] += caddy2[i].QUANTITY; //30+
                    controlloDati[1] = true;
                } else if (caddy2[i].AGE < 50) {
                    B[2] += caddy2[i].QUANTITY; // 40+
                    controlloDati[2] = true;
                } else if (caddy2[i].AGE < 60) {
                    B[3] += caddy2[i].QUANTITY; // 50+
                    controlloDati[3] = true;
                } else {
                    B[4] += caddy2[i].QUANTITY; // 60+
                    controlloDati[4] = true;
                }
            } else if (caddy2[i].NUTRISCORE[1].localeCompare("C") == 0) {
                if (caddy2[i].AGE < 30) {
                    C[0] += caddy2[i].QUANTITY; // 20+ perché abbiamo controllato che non esistono persone di meno di 20 anni
                    controlloDati[0] = true;
                } else if (caddy2[i].AGE < 40) {
                    C[1] += caddy2[i].QUANTITY; //30+
                    controlloDati[1] = true;
                } else if (caddy2[i].AGE < 50) {
                    C[2] += caddy2[i].QUANTITY; // 40+
                    controlloDati[2] = true;
                } else if (caddy2[i].AGE < 60) {
                    C[3] += caddy2[i].QUANTITY; // 50+
                    controlloDati[3] = true;
                } else {
                    C[4] += caddy2[i].QUANTITY; // 60+
                    controlloDati[4] = true;
                }
            } else if (caddy2[i].NUTRISCORE[1].localeCompare("D") == 0) {
                if (caddy2[i].AGE < 30) {
                    D[0] += caddy2[i].QUANTITY; // 20+ perché abbiamo controllato che non esistono persone di meno di 20 anni
                    controlloDati[0] = true;
                } else if (caddy2[i].AGE < 40) {
                    D[1] += caddy2[i].QUANTITY; //30+
                    controlloDati[1] = true;
                } else if (caddy2[i].AGE < 50) {
                    D[2] += caddy2[i].QUANTITY; // 40+
                    controlloDati[2] = true;
                } else if (caddy2[i].AGE < 60) {
                    D[3] += caddy2[i].QUANTITY; // 50+
                    controlloDati[3] = true;
                } else {
                    D[4] += caddy2[i].QUANTITY; // 60+
                    controlloDati[4] = true;
                }
            } else if (caddy2[i].NUTRISCORE[1].localeCompare("E") == 0) {
                if (caddy2[i].AGE < 30) {
                    E[0] += caddy2[i].QUANTITY; // 20+ perché abbiamo controllato che non esistono persone di meno di 20 anni
                    controlloDati[0] = true;
                } else if (caddy2[i].AGE < 40) {
                    E[1] += caddy2[i].QUANTITY; //30+
                    controlloDati[1] = true;
                } else if (caddy2[i].AGE < 50) {
                    E[2] += caddy2[i].QUANTITY; // 40+
                    controlloDati[2] = true;
                } else if (caddy2[i].AGE < 60) {
                    E[3] += caddy2[i].QUANTITY; // 50+
                    controlloDati[3] = true;
                } else {
                    E[4] += caddy2[i].QUANTITY; // 60+
                    controlloDati[4] = true;
                }
            }
        }
    }
    // console.log(etichetta + ' score: A,B,C,D,E.');
    // console.log(A);
    // console.log(B);
    // console.log(C);
    // console.log(D);
    // console.log(E);

    var dataset = conversioneInDataset(A, B, C, D, E);
    return dataset;
}


function vediStipendio(nutData) {
    var fStipendio = [];
    var exist = false;
    for (var i = 0; i < nutData.length; i++) {
        for (var j = 0; j < fStipendio.length; j++) {
            if (nutData[i].INCOME.localeCompare(fStipendio[j]) == 0) { // se == 0 esiste già e quindi non lo metto dentro
                exist = true;
                break;
            }
        }
        if (exist == false) {
            fStipendio.push(nutData[i].INCOME);
        }
        exist = false;
    }
    console.log(fStipendio);
}



function filterSalary(nutData, etichetta) {
    caddyFilterBought(nutData); // filtra le transazioni andate a buon fine, conta solo i prodotti nel carrello e comprate. Inoltre separa caddy1 e caddy2

    // console.log(etichetta);

    // NutriScore
    var A = [0, 0, 0, 0, 0];
    var B = [0, 0, 0, 0, 0];
    var C = [0, 0, 0, 0, 0];
    var D = [0, 0, 0, 0, 0];
    var E = [0, 0, 0, 0, 0];
    controlloDati = [false, false, false, false, false];
    for (var i = 0; i < caddy1.length; i++) {

        if (caddy1[i].TREATMENT.localeCompare(etichetta) == 0) {
            if (caddy1[i].NUTRISCORE[1].localeCompare("A") == 0) {
                if ((caddy1[i].INCOME.localeCompare("0_1000") == 0) || (caddy1[i].INCOME.localeCompare("1000_2000") == 0)) {
                    A[0] -= caddy1[i].QUANTITY;
                    controlloDati[0] = true;
                } else if ((caddy1[i].INCOME.localeCompare("2000_3000") == 0) || (caddy1[i].INCOME.localeCompare("3000_4000") == 0)) {
                    A[1] -= caddy1[i].QUANTITY;
                    controlloDati[1] = true;
                } else if ((caddy1[i].INCOME.localeCompare("4000_5000") == 0) || (caddy1[i].INCOME.localeCompare("5000_6000") == 0)) {
                    A[2] -= caddy1[i].QUANTITY;
                    controlloDati[2] = true;
                } else if ((caddy1[i].INCOME.localeCompare("6000_7000") == 0) || (caddy1[i].INCOME.localeCompare("7000_8000") == 0)) {
                    A[3] -= caddy1[i].QUANTITY;
                    controlloDati[3] = true;
                } else {
                    A[4] -= caddy1[i].QUANTITY; // 8k+
                    controlloDati[4] = true;
                }

            } else if (caddy1[i].NUTRISCORE[1].localeCompare("B") == 0) {
                if ((caddy1[i].INCOME.localeCompare("0_1000") == 0) || (caddy1[i].INCOME.localeCompare("1000_2000") == 0)) {
                    B[0] -= caddy1[i].QUANTITY;
                    controlloDati[0] = true;
                } else if ((caddy1[i].INCOME.localeCompare("2000_3000") == 0) || (caddy1[i].INCOME.localeCompare("3000_4000") == 0)) {
                    B[1] -= caddy1[i].QUANTITY;
                    controlloDati[1] = true;
                } else if ((caddy1[i].INCOME.localeCompare("4000_5000") == 0) || (caddy1[i].INCOME.localeCompare("5000_6000") == 0)) {
                    B[2] -= caddy1[i].QUANTITY;
                    controlloDati[2] = true;
                } else if ((caddy1[i].INCOME.localeCompare("6000_7000") == 0) || (caddy1[i].INCOME.localeCompare("7000_8000") == 0)) {
                    B[3] -= caddy1[i].QUANTITY;
                    controlloDati[3] = true;
                } else {
                    B[4] -= caddy1[i].QUANTITY; // 8k+
                    controlloDati[4] = true;
                }
            } else if (caddy1[i].NUTRISCORE[1].localeCompare("C") == 0) {
                if ((caddy1[i].INCOME.localeCompare("0_1000") == 0) || (caddy1[i].INCOME.localeCompare("1000_2000") == 0)) {
                    C[0] -= caddy1[i].QUANTITY;
                    controlloDati[0] = true;
                } else if ((caddy1[i].INCOME.localeCompare("2000_3000") == 0) || (caddy1[i].INCOME.localeCompare("3000_4000") == 0)) {
                    C[1] -= caddy1[i].QUANTITY;
                    controlloDati[1] = true;
                } else if ((caddy1[i].INCOME.localeCompare("4000_5000") == 0) || (caddy1[i].INCOME.localeCompare("5000_6000") == 0)) {
                    C[2] -= caddy1[i].QUANTITY;
                    controlloDati[2] = true;
                } else if ((caddy1[i].INCOME.localeCompare("6000_7000") == 0) || (caddy1[i].INCOME.localeCompare("7000_8000") == 0)) {
                    C[3] -= caddy1[i].QUANTITY;
                    controlloDati[3] = true;
                } else {
                    C[4] -= caddy1[i].QUANTITY; // 8k+
                    controlloDati[4] = true;
                }
            } else if (caddy1[i].NUTRISCORE[1].localeCompare("D") == 0) {
                if ((caddy1[i].INCOME.localeCompare("0_1000") == 0) || (caddy1[i].INCOME.localeCompare("1000_2000") == 0)) {
                    D[0] -= caddy1[i].QUANTITY;
                    controlloDati[0] = true;
                } else if ((caddy1[i].INCOME.localeCompare("2000_3000") == 0) || (caddy1[i].INCOME.localeCompare("3000_4000") == 0)) {
                    D[1] -= caddy1[i].QUANTITY;
                    controlloDati[1] = true;
                } else if ((caddy1[i].INCOME.localeCompare("4000_5000") == 0) || (caddy1[i].INCOME.localeCompare("5000_6000") == 0)) {
                    D[2] -= caddy1[i].QUANTITY;
                    controlloDati[2] = true;
                } else if ((caddy1[i].INCOME.localeCompare("6000_7000") == 0) || (caddy1[i].INCOME.localeCompare("7000_8000") == 0)) {
                    D[3] -= caddy1[i].QUANTITY;
                    controlloDati[3] = true;
                } else {
                    D[4] -= caddy1[i].QUANTITY; // 8k+
                    controlloDati[4] = true;
                }
            } else if (caddy1[i].NUTRISCORE[1].localeCompare("E") == 0) {
                if ((caddy1[i].INCOME.localeCompare("0_1000") == 0) || (caddy1[i].INCOME.localeCompare("1000_2000") == 0)) {
                    E[0] -= caddy1[i].QUANTITY;
                    controlloDati[0] = true;
                } else if ((caddy1[i].INCOME.localeCompare("2000_3000") == 0) || (caddy1[i].INCOME.localeCompare("3000_4000") == 0)) {
                    E[1] -= caddy1[i].QUANTITY;
                    controlloDati[1] = true;
                } else if ((caddy1[i].INCOME.localeCompare("4000_5000") == 0) || (caddy1[i].INCOME.localeCompare("5000_6000") == 0)) {
                    E[2] -= caddy1[i].QUANTITY;
                    controlloDati[2] = true;
                } else if ((caddy1[i].INCOME.localeCompare("6000_7000") == 0) || (caddy1[i].INCOME.localeCompare("7000_8000") == 0)) {
                    E[3] -= caddy1[i].QUANTITY;
                    controlloDati[3] = true;
                } else {
                    E[4] -= caddy1[i].QUANTITY; // 8k+
                    controlloDati[4] = true;
                }
            }
        }

    }
    for (var i = 0; i < caddy2.length; i++) {
        if (caddy2[i].TREATMENT.localeCompare(etichetta) == 0) {
            if (caddy2[i].NUTRISCORE[1].localeCompare("A") == 0) {
                if ((caddy2[i].INCOME.localeCompare("0_1000") == 0) || (caddy2[i].INCOME.localeCompare("1000_2000") == 0)) {
                    A[0] += caddy2[i].QUANTITY;
                    controlloDati[0] = true;
                } else if ((caddy2[i].INCOME.localeCompare("2000_3000") == 0) || (caddy2[i].INCOME.localeCompare("3000_4000") == 0)) {
                    A[1] += caddy2[i].QUANTITY;
                    controlloDati[1] = true;
                } else if ((caddy2[i].INCOME.localeCompare("4000_5000") == 0) || (caddy2[i].INCOME.localeCompare("5000_6000") == 0)) {
                    A[2] += caddy2[i].QUANTITY;
                    controlloDati[2] = true;
                } else if ((caddy2[i].INCOME.localeCompare("6000_7000") == 0) || (caddy2[i].INCOME.localeCompare("7000_8000") == 0)) {
                    A[3] += caddy2[i].QUANTITY;
                    controlloDati[3] = true;
                } else {
                    A[4] += caddy2[i].QUANTITY; // 8k+
                    controlloDati[4] = true;
                }

            } else if (caddy2[i].NUTRISCORE[1].localeCompare("B") == 0) {
                if ((caddy2[i].INCOME.localeCompare("0_1000") == 0) || (caddy2[i].INCOME.localeCompare("1000_2000") == 0)) {
                    B[0] += caddy2[i].QUANTITY;
                    controlloDati[0] = true;
                } else if ((caddy2[i].INCOME.localeCompare("2000_3000") == 0) || (caddy2[i].INCOME.localeCompare("3000_4000") == 0)) {
                    B[1] += caddy2[i].QUANTITY;
                    controlloDati[1] = true;
                } else if ((caddy2[i].INCOME.localeCompare("4000_5000") == 0) || (caddy2[i].INCOME.localeCompare("5000_6000") == 0)) {
                    B[2] += caddy2[i].QUANTITY;
                    controlloDati[2] = true;
                } else if ((caddy2[i].INCOME.localeCompare("6000_7000") == 0) || (caddy2[i].INCOME.localeCompare("7000_8000") == 0)) {
                    B[3] += caddy2[i].QUANTITY;
                    controlloDati[3] = true;
                } else {
                    B[4] += caddy2[i].QUANTITY; // 8k+
                    controlloDati[4] = true;
                }
            } else if (caddy2[i].NUTRISCORE[1].localeCompare("C") == 0) {
                if ((caddy2[i].INCOME.localeCompare("0_1000") == 0) || (caddy2[i].INCOME.localeCompare("1000_2000") == 0)) {
                    C[0] += caddy2[i].QUANTITY;
                    controlloDati[0] = true;
                } else if ((caddy2[i].INCOME.localeCompare("2000_3000") == 0) || (caddy2[i].INCOME.localeCompare("3000_4000") == 0)) {
                    C[1] += caddy2[i].QUANTITY;
                    controlloDati[1] = true;
                } else if ((caddy2[i].INCOME.localeCompare("4000_5000") == 0) || (caddy2[i].INCOME.localeCompare("5000_6000") == 0)) {
                    C[2] += caddy2[i].QUANTITY;
                    controlloDati[2] = true;
                } else if ((caddy2[i].INCOME.localeCompare("6000_7000") == 0) || (caddy2[i].INCOME.localeCompare("7000_8000") == 0)) {
                    C[3] += caddy2[i].QUANTITY;
                    controlloDati[3] = true;
                } else {
                    C[4] += caddy2[i].QUANTITY; // 8k+
                    controlloDati[4] = true;
                }
            } else if (caddy2[i].NUTRISCORE[1].localeCompare("D") == 0) {
                if ((caddy2[i].INCOME.localeCompare("0_1000") == 0) || (caddy2[i].INCOME.localeCompare("1000_2000") == 0)) {
                    D[0] += caddy2[i].QUANTITY;
                    controlloDati[0] = true;
                } else if ((caddy2[i].INCOME.localeCompare("2000_3000") == 0) || (caddy2[i].INCOME.localeCompare("3000_4000") == 0)) {
                    D[1] += caddy2[i].QUANTITY;
                    controlloDati[1] = true;
                } else if ((caddy2[i].INCOME.localeCompare("4000_5000") == 0) || (caddy2[i].INCOME.localeCompare("5000_6000") == 0)) {
                    D[2] += caddy2[i].QUANTITY;
                    controlloDati[2] = true;
                } else if ((caddy2[i].INCOME.localeCompare("6000_7000") == 0) || (caddy2[i].INCOME.localeCompare("7000_8000") == 0)) {
                    D[3] += caddy2[i].QUANTITY;
                    controlloDati[3] = true;
                } else {
                    D[4] += caddy2[i].QUANTITY; // 8k+
                    controlloDati[4] = true;
                }
            } else if (caddy2[i].NUTRISCORE[1].localeCompare("E") == 0) {
                if ((caddy2[i].INCOME.localeCompare("0_1000") == 0) || (caddy2[i].INCOME.localeCompare("1000_2000") == 0)) {
                    E[0] += caddy2[i].QUANTITY;
                    controlloDati[0] = true;
                } else if ((caddy2[i].INCOME.localeCompare("2000_3000") == 0) || (caddy2[i].INCOME.localeCompare("3000_4000") == 0)) {
                    E[1] += caddy2[i].QUANTITY;
                    controlloDati[1] = true;
                } else if ((caddy2[i].INCOME.localeCompare("4000_5000") == 0) || (caddy2[i].INCOME.localeCompare("5000_6000") == 0)) {
                    E[2] += caddy2[i].QUANTITY;
                    controlloDati[2] = true;
                } else if ((caddy2[i].INCOME.localeCompare("6000_7000") == 0) || (caddy2[i].INCOME.localeCompare("7000_8000") == 0)) {
                    E[3] += caddy2[i].QUANTITY;
                    controlloDati[3] = true;
                } else {
                    E[4] += caddy2[i].QUANTITY; // 8k+
                    controlloDati[4] = true;
                }
            }
        }
    }
    console.log('Nutriscore SALARY ' + etichetta + ': A,B,C,D,E.');
    console.log(A);
    console.log(B);
    console.log(C);
    console.log(D);
    console.log(E);

    var dataset = conversioneInDataset(A, B, C, D, E);
    return dataset;
}


function chooseAsseX(option) {
    asseX = option;
    if ((lchart1 != null) && (lchart2 != null)) { // se sono all'iterazione successiva al primo
        createLabelChart(asseX, lchart1, "labelChart1");
        createLabelChart(asseX, lchart2, "labelChart2");
    }
}

function chooseLChart1(label) {
    lchart1 = label;
    if (asseX != null) { // se sono all'iterazione successiva al primo
        createLabelChart(asseX, lchart1, "labelChart1");
    } else {

    }
}

function chooseLChart2(label) {
    lchart2 = label;
    if (asseX != null) { // se sono all'iterazione successiva al primo
        createLabelChart(asseX, lchart2, "labelChart2");
    }
}

function animateValue(id, start, end, duration) {
    if (start === end) return;
    var range = end - start;
    var current = start;
    var increment = end > start ? 1 : -1;
    var stepTime = Math.abs(Math.floor(duration / range));
    var obj = document.getElementById(id);
    var timer = setInterval(function() {
        current += increment;
        obj.innerHTML = current;
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}



// D3 code
function createLeftHistogram() {
    var data = [{
            "name": "60+",
            "value": fasceEta[4],
        },
        {
            "name": "50-59",
            "value": fasceEta[3],
        },
        {
            "name": "40-49",
            "value": fasceEta[2],
        },
        {
            "name": "30-39",
            "value": fasceEta[1],
        },
        {
            "name": "20-29",
            "value": fasceEta[0],
        }
    ];

    var totPartecipanti = fasceEta[0] + fasceEta[1] + fasceEta[2] + fasceEta[3] + fasceEta[4];
    // document.getElementById("totPartecipanti").innerHTML = totPartecipanti;
    animateValue("contatore", 0, totPartecipanti, 2500);
    // console.log(data);

    // Create left horizontal bar chart
    var margin = {
        top: 15,
        right: 55,
        bottom: 15,
        left: 50
    };
    var barPadding = 2;

    var width = 200 - margin.left - margin.right,
        height = 200 - margin.top - margin.bottom;

    var svg = d3.select("#hHistogram").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleLinear()
        .range([0, width])
        .domain([0, d3.max(data, function(d) {
            return d.value;
        })]);

    var y = d3.scaleBand()
        .range([height, 0], .1)
        .domain(data.map(function(d) {
            return d.name;
        }));


    //make y axis to show bar names
    var yAxis = d3.axisLeft()
        .scale(y)
        //no tick marks
        .tickSize(0);

    svg.append("g")
        .attr("class", "label")
        .call(yAxis)

    var bars = svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("g")

    var t = d3.transition()
        .duration(1000)
        .ease(d3.easePoly);

    //append rects
    bars.append("rect")
        .attr("y", function(d) {
            return y(d.name);
        })
        .transition(t)
        .attr("class", "bar")
        .attr("fill", "#009688")
        .attr("height", y.bandwidth() - barPadding)
        .attr("x", 0)
        .attr("width", function(d) {
            return x(d.value);
        });

    //add a value label to the right of each bar
    bars.append("text")
        .attr("y", function(d) {
            return y(d.name) + y.bandwidth() / 2 + 4;
        })
        .transition(t)
        .attr("class", "label")
        .attr("fill", "#009688")
        .attr("x", function(d) {
            return x(d.value) + 3;
        })
        .text(function(d) {
            return d.value;
        });


    d3.select(".domain").remove();

};

function createLeftSalaryHistogram() {
    var data = [{
            "name": "8k+ ",
            "value": fasceStipendio[4],
        },
        {
            "name": "6k - 8k",
            "value": fasceStipendio[3],
        },
        {
            "name": "4k - 6k",
            "value": fasceStipendio[2],
        },
        {
            "name": "2k - 4k",
            "value": fasceStipendio[1],
        },
        {
            "name": "0 - 2k",
            "value": fasceStipendio[0],
        }
    ];

    // Create left horizontal bar chart
    var margin = {
        top: 15,
        right: 55,
        bottom: 15,
        left: 50
    };
    var barPadding = 2;

    var width = 200 - margin.left - margin.right,
        height = 200 - margin.top - margin.bottom;

    var svg = d3.select("#salaryhHistogram").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleLinear()
        .range([0, width])
        .domain([0, d3.max(data, function(d) {
            return d.value;
        })]);

    var y = d3.scaleBand()
        .range([height, 0], .1)
        .domain(data.map(function(d) {
            return d.name;
        }));


    //make y axis to show bar names
    var yAxis = d3.axisLeft()
        .scale(y)
        //no tick marks
        .tickSize(0);

    svg.append("g")
        .attr("class", "label")
        .call(yAxis)

    var bars = svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("g")

    var t = d3.transition()
        .duration(1000)
        .ease(d3.easePoly);

    //append rects
    bars.append("rect")
        .attr("y", function(d) {
            return y(d.name);
        })
        .transition(t)
        .attr("class", "bar")
        .attr("fill", "#009688")
        .attr("height", y.bandwidth() - barPadding)
        .attr("x", 0)
        .attr("width", function(d) {
            return x(d.value);
        });

    //add a value label to the right of each bar
    bars.append("text")
        .attr("y", function(d) {
            return y(d.name) + y.bandwidth() / 2 + 4;
        })
        .transition(t)
        .attr("class", "label")
        .attr("fill", "#009688")
        .attr("x", function(d) {
            return x(d.value) + 3;
        })
        .text(function(d) {
            return d.value;
        });

    d3.select(".domain").remove();

}

function createMidScatterplot() {

    var nutProducts = calculateNumberOfProducts(nutData);

    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 30, bottom: 30, left: 60 },
        width = 800 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#scatterplot")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");


    // Add X axis
    var x = d3.scaleLinear()
        .domain([d3.min(nutProducts, function(d) { return d.score - 3; }), d3.max(nutProducts, function(d) { return d.score + 3; })])
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([d3.min(nutProducts, function(d) { return d.pricekgl; }), d3.max(nutProducts, function(d) { return d.pricekgl + 1.33; })])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));


    // Add dots

    svg.append('g')
        .selectAll("dot")
        .data(nutProducts)
        .enter()
        .append("circle")
        .attr("cx", function(d) { return x(d.score); })
        .attr("cy", 0)
        .attr("r", 0)
        .attr("id", function(d) { return d.id; })
        .style("fill", function(d) {
            if (d.nutriscore_letter.localeCompare("A") == 0) {
                return "#008000";
            } else if (d.nutriscore_letter.localeCompare("B") == 0) {
                return "#7CFC00";
            } else if (d.nutriscore_letter.localeCompare("C") == 0) {
                return "#FFF500";
            } else if (d.nutriscore_letter.localeCompare("D") == 0) {
                return "#FFA500";
            } else return "#FF0000";
        })
        .on("mouseover", function() {
            if (lastId != null) {
                d3.select('[id=' + '\"' + lastId + '\"' + ']').attr("r", 3);
                //console.log("id selezionato: ", event.target.id);
            }
            //console.log("last id: ", lastId);
            d3.select(this).attr("r", 3 * 2);
            loadInfo(nutProducts, event.target.id);
            lastId = event.target.id;
        })
        .transition() //la transizione non ha un valore informativo ma solo grafico
        .ease(d3.easeBounce)
        .delay(function(d, i) {
            return i * 10;
        })
        .duration(2000)
        .attr("r", () => 3)
        .attr("cy", function(d) { return y(d.pricekgl); });


    // Label Y-axis
    svg.append('text')
        .attr('x', 10)
        .attr('y', 10)
        .attr('class', 'label')
        .text('Price €/Kg €/L');

    // Label X-axis
    svg.append('text')
        .attr('x', width)
        .attr('y', height - 10)
        .attr('text-anchor', 'end')
        .attr('class', 'label')
        .text('Score FSA');
}


function createLabelChart(asseX, label, idLabelChart) {
    var data;
    var labelX;
    var idSVG;
    var idBar;
    if (asseX.localeCompare('anni') == 0) {
        data = filterAge(nutData, label);
        labelX = "Age";
    } else if (asseX.localeCompare('stipendio') == 0) { //  ELSE IF asseX == 'stipendio'
        data = filterSalary(nutData, label);
        labelX = "Salary";
    }

    // D3 code

    var n = 5, // number of groups
        m = 5; // number of bars per group

    if (idLabelChart.localeCompare("labelChart1") == 0) {
        idSVG = "labelChart1svg";
    } else {
        idSVG = "labelChart2svg";
    }
    var svg = d3.select("#" + idSVG); // PARAMETRO <---
    svg.remove();


    var margin = { top: 20, right: 30, bottom: 50, left: 50 },
        width = 550 - margin.left - margin.right,
        height = 550 - margin.top - margin.bottom;

    var div = d3.select("#" + idLabelChart).append("div")
        .attr("class", "tooltip");


    // fissiamo il valore massimo dell'asse y per favorire il confronto visivo, altrimenti i due grafici avrebbero scale differenti
    if (asseX.localeCompare('anni') == 0) {
        var y0 = 35;
    } else if (asseX.localeCompare('stipendio') == 0) { //  ELSE IF asseX == 'stipendio'
        var y0 = 45;
    }


    //console.log(y0); // 55
    var y = d3.scaleLinear()
        .domain([-y0, y0])
        .range([height, 0]);

    //un gruppo
    var x0 = d3.scaleBand()
        .domain(d3.range(n))
        .range([0, width]);
    //m gruppi
    var x1 = d3.scaleBand()
        .domain(d3.range(m))
        .range([0, x0.bandwidth()])
        .paddingOuter(1);

    var z = d3.scaleOrdinal()
        .range(["#008000", "#7CFC00", "#FFF500", "#FFA500", "#FF0000"]); // cambiare colori in meno saturi


    var yAxis = d3.axisLeft(y);

    if (asseX.localeCompare("anni") == 0) {

        var xScaleLabels = d3.scalePoint()
            .domain(fEta)
            .rangeRound([width / 10, width - (width / 10)]); // diviso 10 perché abbiamo 5 gruppi e vogliamo posizionarli a metà di ogni gruppo (numero diviso 5 e poi diviso 2)
    } else {
        var xScaleLabels = d3.scalePoint()
            .domain(fStipendio)
            .rangeRound([width / 10, width - (width / 10)]); // diviso 10 perché abbiamo 5 gruppi e vogliamo posizionarli a metà di ogni gruppo (numero diviso 5 e poi diviso 2)
    }


    var axisTop2 = d3
        .axisBottom()
        .scale(xScaleLabels)
        .ticks(data.length)
        .tickSize(7)
        .tickSizeOuter(0);


    svg = d3.select("#" + idLabelChart)
        .append("svg")
        .attr("viewBox", `0 0 600 600`)
        .attr("id", idSVG)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    if (idLabelChart.localeCompare("labelChart1") == 0) {
        idBar = "bars1";
        var id = 0;
    } else {
        idBar = "bars2";
        var id = 50;
    }


    svg.append("g").attr("id", idBar).selectAll("g")
        .data(data)
        .enter().append("g")
        .style("fill", function(d, i) { return z(i); })
        .attr("transform", function(d, i) { return "translate(" + x1(i) + ",0)"; })
        .selectAll("rect")
        .data(function(d) { return d; })
        .enter().append("rect")
        .attr("id", function(d, i) { id = id + 1; return id; })
        .attr("width", x1.bandwidth())
        .attr("height", function(d) {
            return 0;
        })
        .attr("x", function(d, i) { return x0(i); })
        .attr("y", function(d) { return height / 2; })
        .on("mouseover", function(d) {
            d3.select(this) // barra
                .transition()
                .duration(300)
                .style("opacity", 0.8);
        })
        .on("mousemove", function(d) {
            div.transition() // tooltip box
                .duration(50)
                .style("opacity", 1);
            div.html(d)
                .style('left', (d3.event.pageX - 15) + 'px')
                .style('top', (d3.event.pageY) + 'px');
        })
        .on("mouseout", function(d) {
            d3.select(this) // barra
                .transition()
                .duration(300)
                .style("opacity", 1);
            div.transition() // tooltip box
                .duration(300)
                .style("opacity", 0);
        })
        .transition()
        .delay(function(d, i) {
            return i * 100;
        })
        .duration(300)
        .attr("height", function(d) {
            if (d == 0) {
                return Math.abs(y(0) - y(d) + 1);
            } else
                return Math.abs(y(0) - y(d));
        })
        .style("fill", function(d) {
            if (d == 0) {

                if (idBar.localeCompare("bars1") == 0) {
                    var idComodo = 0;
                } else {
                    var idComodo = 50;
                }

                for (j = 0; j < 5; j++) {
                    if (controlloDati[j] == false) {
                        if (this.id == (idComodo + 1 + j) || this.id == (idComodo + 6 + j) || this.id == (idComodo + 11 + j) || this.id == (idComodo + 16 + j) || this.id == (idComodo + 21 + j))
                            return "#000000";
                    }
                }

            } else
                return;
        })
        .attr("y", function(d) {
            return y(Math.max(0, d));
        });


    svg.append("g")
        .call(axisTop2)
        .attr("transform", "translate(0," + height + ")")
        .call(g => g.select(".domain").remove()); //exit delle colonne del grafico
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);




    // Label Y
    svg.append("text").text("Delta purchases Δ")
        .attr("x", 0 - height / 2)
        .attr("y", 0 - margin.left)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .attr("transform", "rotate(-90)");
    // Label X
    svg.append("text").text(labelX)
        .attr("x", width / 2)
        .attr("y", height + margin.bottom)
        .style("text-anchor", "middle");



    var options = ["really healthy", "healthy", "neutral", "unhealthy", "really unhealthy", "no data available"];
    var z = d3.scaleOrdinal()
        .range(["#008000", "#7CFC00", "#FFF500", "#FFA500", "#FF0000", "#000000"]);

    // legend
    var legend = svg.selectAll(".legend")
        .data(options.slice())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(-90," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", width - 20)
        .attr("width", 15)
        .attr("height", 15)
        .style("fill", function(d, i) { return z(i) });

    legend.append("text")
        .attr("x", width)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .text(function(d) { return d; });




}



function createBestLabelChart(nutData) {
    var dataset5C = filterAge(nutData, "5C");
    var datasetTL = filterAge(nutData, "TL");
    var datasetRIGDA = filterAge(nutData, "RI-GDA");
    var datasetNeutral = filterAge(nutData, "neutre");

    var score5C = 0;
    var scoreTL = 0;
    var scoreRIGDA = 0;
    var scoreNeutral = 0;

    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 5; j++) {
            if (i == 0) {
                score5C = score5C + dataset5C[i][j] * 2; // etichetta A verde scuro
                scoreTL = scoreTL + datasetTL[i][j] * 2;
                scoreRIGDA = scoreRIGDA + datasetRIGDA[i][j] * 2;
                scoreNeutral = scoreNeutral + datasetNeutral[i][j] * 2;
            } else if (i == 1) {
                score5C = score5C + dataset5C[i][j] * 1; // etichetta B verde chiaro
                scoreTL = scoreTL + datasetTL[i][j] * 1;
                scoreRIGDA = scoreRIGDA + datasetRIGDA[i][j] * 1;
                scoreNeutral = scoreNeutral + datasetNeutral[i][j] * 1;
            } else if (i == 2) {
                score5C = score5C + dataset5C[i][j] * 0; // etichetta C gialla
                scoreTL = scoreTL + datasetTL[i][j] * 0;
                scoreRIGDA = scoreRIGDA + datasetRIGDA[i][j] * 0;
                scoreNeutral = scoreNeutral + datasetNeutral[i][j] * 0;
            } else if (i == 3) {
                score5C = score5C - dataset5C[i][j] * 1; // etichetta D arancio
                scoreTL = scoreTL - datasetTL[i][j] * 1;
                scoreRIGDA = scoreRIGDA - datasetRIGDA[i][j] * 1;
                scoreNeutral = scoreNeutral - datasetNeutral[i][j] * 1;
            } else {
                score5C = score5C - dataset5C[i][j] * 2; // etichetta E rossa
                scoreTL = scoreTL - datasetTL[i][j] * 2;
                scoreRIGDA = scoreRIGDA - datasetRIGDA[i][j] * 2;
                scoreNeutral = scoreNeutral - datasetNeutral[i][j] * 2;
            }
        }
    }

    var dataset = [score5C, scoreTL, scoreRIGDA, scoreNeutral];
    var fLabel = ["Nutri-score 5C", "Traffic Lights", "RI-GDA", "Neutral"];


    // D3 code
    var margin = { top: 20, right: 20, bottom: 50, left: 70 };
    var width = 500 - margin.left - margin.right;
    var height = 600 - margin.top - margin.bottom;

    var div = d3.select("#bestLabelChart").append("div")
        .attr("class", "tooltip");

    var svg = d3.select("#bestLabelChart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + 2 * margin.bottom) // <----- abbiamo messo 2* per ovviare il taglio dell'asse Y
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")"); // magari eliminare margin.top <--------


    var maxHeight = d3.max(dataset, function(d) { return Math.abs(d) }) + 23;
    var minHeight = d3.min(dataset, function(d) { return Math.abs(d) });

    //set y scale
    // var yScale = d3.scaleLinear()
    //     .domain([maxHeight, -maxHeight])
    //     .range([0, height]);

    /* This scale produces negative output for negatve input */
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset)])
        .range([height, 0]);

    /*
     * We need a different scale for drawing the y-axis. It needs
     * a reversed range, and a larger domain to accomodate negaive values.
     */
    var yAxisScale = d3.scaleLinear()
        .domain([d3.min(dataset), d3.max(dataset)])
        .range([yScale(d3.min(dataset)), 0]);


    //add x axis
    var xScale = d3.scaleBand()
        .domain(fLabel)
        .range([0, width]); //scaleBand is used for  bar chart

    var barPadding = 20;
    var bars = svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect");

    bars.attr("x", function(d, i) {
            return i * (width / dataset.length) + barPadding; //i*(width/dataset.length);
        })
        .attr("y", function(d) {
            if (d < 0) {
                return height;
            } else {
                return yScale(d);
            }

        }) //for bottom to top
        .attr("width", function(d) {
            return (width / dataset.length) - 2 * barPadding;
        })
        .attr("height", function(d) {
            return height - yScale(Math.abs(d));
        })
        .on("mouseover", function(d) {
            d3.select(this) // barra
                .transition()
                .duration(300)
                .style("opacity", 0.8);
        })
        .on("mousemove", function(d) {
            div.transition() // tooltip box
                .duration(50)
                .style("opacity", 1);
            div.html(d)
                .style('left', (d3.event.pageX - 15) + 'px')
                .style('top', (d3.event.pageY) + 'px');
        })
        .on("mouseout", function(d) {
            d3.select(this) // barra
                .transition()
                .duration(300)
                .style("opacity", 1);
            div.transition() // tooltip box
                .duration(300)
                .style("opacity", 0);
        });
    bars.attr("fill", function(d) {
        if (d >= 0) {
            return "green";
        } else {
            return "orange";
        }
    });

    // add x and y axis
    var yAxis = d3.axisLeft(yAxisScale);
    svg.append("g").call(yAxis);


    var xAxis = d3.axisBottom(xScale); /*.tickFormat("");remove tick label*/
    svg.append("g").call(xAxis).attr("transform", "translate(0," + height + ")");

    // Add Label Y
    svg.append("text").text("Weighted delta purchases wΔ")
        .attr("x", 0 - height / 2)
        .attr("y", 0 - margin.left)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .attr("transform", "rotate(-90)");
}


// Load CSV file
d3.csv("data/dc.csv", function(error, csv) {
    if (error) {
        console.log(error); //Log the error.
        throw error;
    }
    csv.forEach(function(d) {

        // Convert numeric values to 'numbers'
        d.SUBJECT = +d.subject;
        // date
        // session
        d.QN_SCORE = +d.QN_score;
        d.AGE = +d.age;
        d.FAMILYSIZE = +d.familysize;
        // children

        // female
        d.BOUGHTPRODUCT = +d.boughtproduct;
        d.CODE = +d.code;
        d.QUANTITY = +d.quantity; // 6 bottiglie
        d.NPRODUCTS = +d.Nproducts; // 1 cesta di acqua
        d.NITEM = +d.Nitem; // quantity * nproducts = 6*1 = 6 total items
        d.CADDY = +d.caddy;
        // bought
        // disp
        // ingr
        // nutr
        // Ndisp
        // Ningr
        // Nnutr
        d.PRICE_KG_L = +d.Price_kg_l;
        d.PRICE = +d.price;
        d.WEIGHT = +d.weight;

        d.KCAL_100G = +d.Kcal_100g;
        d.LIPIDES_100G = +d.Lipides_100g;
        d.AGS_100G = +d.AGS_100g;
        d.GLUCIDES_100G = +d.Glucides_100g;
        d.SUCRES_100G = +d.Sucres_100g;
        d.PROTEINES_100G = +d.Proteines_100g;
        d.SEL_100G = +d.Sel_100g;
        d.FIBRES_100G = +d.Fibres_100g;
        d.KCAL_PORTION = +d.kcal_portion;
        d.KCAL_POURCENT = +d.Kcal_pourcent;
        d.LIPIDES_PORTION = +d.Lipides_portion;
        d.LIPIDES_POURCENT = +d.Lipides_pourcent;
        d.AGS_PORTION = +d.AGS_portion;
        d.AGS_POURCENT = +d.AGS_pourcent;
        d.SUCRE_PORTION = +d.Sucre_portion;
        d.SUCRE_POURCENT = +d.Sucre_pourcent;
        d.SEL_PORTION = +d.Sel_portion;
        d.SEL_POURCENT = +d.Sel_pourcent;
        // lim, non presente in csv

        // labels
        d.SCORE = +d.score; // score FSA
        d.NUTRISCORE = [d.NutriScore_color, d.NutriScore_letter];
        d.TRAFFICLIGHT = [d.TL_fat_color, d.TL_AGS_color, d.TL_sugar_color, d.TL_salt_color];
        d.NUTRISCOREPARTIAL = [d.NutriScore_partial_color, d.NutriScore_partial_letter];


        //Break up lists into javascript arrays
        d.INCOME = d.income;
        d.TREATMENT = d.treatment;
        d.PROFESSION = d.profession;
        d.PRODUCT = d.product;
        d.BRAND = d.brand;
        d.UNIT_PRIX_KG_L = d.Unit_prix_kg_l;
        d.UNIT_WEIGHT = d.unit_weight;
        // portion


        // Function that checks Subject uniqueness
        calculateAgeArray(d.SUBJECT, d.AGE);
        calculateSalaryArray(d.SUBJECT, d.INCOME);


    });

    // Store csv data in a global variable
    nutData = csv;

    createLabelChart('anni', '5C', "labelChart1");
    createLabelChart('anni', 'TL', "labelChart2");
    calculateNumberOfProducts(nutData);
    createBestLabelChart(nutData);
    createLeftHistogram();
    createLeftSalaryHistogram();
    createMidScatterplot();
    caddyFilterBought(nutData);
});