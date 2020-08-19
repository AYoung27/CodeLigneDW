use codeligne;
db.createCollection('usuarios');
db.createCollection('planes');

//infoplanes
db.planes.insertMany([{
	"nombrePlan":"Plan Gratis",
	"precio":0,
	"numeroCarpetas":5,
	"numeroProyectos":5,
	"numeroSnippets":10
},
{
	"nombrePlan":"Plan Estandar",
	"precio":7,
	"numeroCarpetas":20,
	"numeroProyectos":10,
	"numeroSnippets":"ilimitado"
},
{
	"nombrePlan":"Plan Gratis",
	"precio":20,
	"numeroCarpetas":"ilimitado",
	"numeroProyectos":"ilimitado",
	"numeroSnippets":"ilimitado"
}])