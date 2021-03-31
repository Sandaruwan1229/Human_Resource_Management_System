function inputBoolean(name) {
   return `
<div class="form-group mb-3" name>
                <select class="form-control" id="exampleFormControlSelect1" name="${name}">
                    <option value="false">false</option>
                    <option value="true">true</option>
                </select>
</div>
`
}

function inputVarchar(name, default_val){
    return`
<div class="form-group mb-3">
    <input class="form-control" type="text" name="${name}" placeholder="" value="${default_val}" >
</div>
`}


function inputInteger(name, default_val){
    return`
<div class="form-group mb-3">
    <input class="form-control" type="number" name="${name}" placeholder="" value="${default_val}" >
</div>
`}
                               
