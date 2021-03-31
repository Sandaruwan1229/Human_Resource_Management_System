const idChecker=(id)=>{
        if (id){
            const toUppper=id.toUpperCase();
            if(toUppper.startsWith("EMP")){
                var res = toUppper.replace("EMP", "")
                if(!isNaN(res)){
                    var h = parseInt(res);
                    return h
                }
                 return false;

            }

            return false;
        }
        return false;
}

const idForm=(id)=>{
    if(id){
        const a=id.toString();
        return "emp"+a.padStart(5, "0");
    }
}

module.exports={idChecker, idForm}
