function Chaquetas (){
    console.log ('Prueba OK');
    var Ancla = document.getElementsByClassName (nav-enlace);
    for (var i = 0; i<Ancla.length; i++){
        Ancla [i].classlist.toggle("desaparece")
    }
}; 