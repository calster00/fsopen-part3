(this["webpackJsonpphonebook-part2"]=this["webpackJsonpphonebook-part2"]||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},36:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(13),c=t.n(o),u=t(2),l=function(e){var n=e.inputValue,t=e.onChange;return r.a.createElement("div",null,"Filter: ",r.a.createElement("input",{value:n,onChange:t}))},i=function(e){return r.a.createElement("form",null,r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:e.name,onChange:e.onNameChange})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:e.number,onChange:e.onNumberChange})),r.a.createElement("div",null,r.a.createElement("button",{onClick:e.onSubmit,type:"submit"},"add")))},m=function(e){var n=e.persons,t=e.removePerson;return n.map((function(e){return r.a.createElement("p",{key:e.name},e.name," ",e.number,r.a.createElement("button",{onClick:function(){return t(e)}},"delete"))}))},s=t(3),f=t.n(s),d="http://localhost:3001/api/persons",h=function(){return f.a.get(d).then((function(e){return e.data}))},b=function(e){return f.a.post(d,e).then((function(e){return e.data}))},p=function(e){return f.a.delete("".concat(d,"/").concat(e)).then((function(e){return e.data}))},v=function(e){var n=e.notification;return null===n?null:r.a.createElement("div",{className:n.type},n.message)},E=function(){var e=Object(a.useState)([]),n=Object(u.a)(e,2),t=n[0],o=n[1],c=Object(a.useState)(""),s=Object(u.a)(c,2),f=s[0],d=s[1],E=Object(a.useState)(""),g=Object(u.a)(E,2),C=g[0],j=g[1],O=Object(a.useState)(""),k=Object(u.a)(O,2),S=k[0],w=k[1],y=Object(a.useState)(null),N=Object(u.a)(y,2),P=N[0],A=N[1];Object(a.useEffect)((function(){h().then((function(e){o(e)}))}),[]);var D=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"success";A({message:e,type:n}),setTimeout((function(){A(null)}),5e3)},J=0===S.length?t:t.filter((function(e){return e.name.toLowerCase().includes(S)}));return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(v,{notification:P}),r.a.createElement(l,{inputValue:S,onChange:function(e){w(e.target.value)}}),r.a.createElement("h3",null,"Add new contact"),r.a.createElement(i,{name:f,number:C,onNameChange:function(e){d(e.target.value)},onNumberChange:function(e){j(e.target.value)},onSubmit:function(e){(e.preventDefault(),f)&&b({name:f,number:C}).then((function(e){o(t.concat(e)),d(""),j(""),D("Added ".concat(e.name))})).catch((function(e){console.log(e.response.data.error),D("".concat(e.response.data.error," "),"error")}))}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(m,{persons:J,removePerson:function(e){var n=e.id,a=e.name;window.confirm("Delete ".concat(a," ?"))&&p(n).then((function(){o(t.filter((function(e){return e.id!==n}))),D("Removed ".concat(a))})).catch((function(){o(t.filter((function(e){return e.id!==n}))),D("".concat(a," had already been removed"),"error")}))}}))};t(36);c.a.render(r.a.createElement(E,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.1ea47fb4.chunk.js.map