(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},19:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(13),o=t.n(u),c=t(2),l=(t(19),t(3)),i=t.n(l),m="/api/persons",s=function(){return i.a.get(m).then((function(e){return e.data}))},f=s,d=function(e){return i.a.post(m,e).then((function(e){return e.data}))},b=function(e,n){return i.a.put("".concat(m,"/").concat(e),n).then((function(e){return e.data}))},h=function(e){return i.a.delete("".concat(m,"/").concat(e)).then((function(e){return s()}))},v=function(e){var n=e.text,t=e.value,a=e.onChange;return r.a.createElement("form",null,r.a.createElement("div",null,n,r.a.createElement("input",{value:t,onChange:a})))},p=function(e){var n=e.onSubmit,t=e.newName,a=e.onNameChange,u=e.newNumber,o=e.onNumberChange;return r.a.createElement("form",{onSubmit:n},r.a.createElement(E,{text:"name:",value:t,onChange:a}),r.a.createElement(E,{text:"number:",value:u,onChange:o}),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},E=function(e){var n=e.text,t=e.value,a=e.onChange;return r.a.createElement("div",null,n,r.a.createElement("input",{value:t,onChange:a}))},g=function(e){var n=e.persons,t=e.filterName,a=e.deletePerson;return r.a.createElement("ul",{className:"no-bullets"},n.filter((function(e){return e.name.toUpperCase().includes(t.toUpperCase())})).map((function(e){return r.a.createElement(w,{key:e.name,person:e,deletePerson:a})})))},w=function(e){var n=e.person,t=e.deletePerson;return r.a.createElement("li",null,n.name," ",n.number,r.a.createElement("button",{onClick:function(){return t(n.id)}},"delete"))},C=function(e){var n=e.message;return null===n?null:r.a.createElement("div",{className:"message"},n)},N=function(e){var n=e.errorMessage;return null===n?null:r.a.createElement("div",{className:"errorMessage"},n)},j=function(){var e=Object(a.useState)([]),n=Object(c.a)(e,2),t=n[0],u=n[1],o=Object(a.useState)(""),l=Object(c.a)(o,2),i=l[0],m=l[1],s=Object(a.useState)(""),E=Object(c.a)(s,2),w=E[0],j=E[1],O=Object(a.useState)(""),k=Object(c.a)(O,2),S=k[0],x=k[1],y=Object(a.useState)(null),P=Object(c.a)(y,2),M=P[0],A=P[1],D=Object(a.useState)(null),J=Object(c.a)(D,2),T=J[0],U=J[1];Object(a.useEffect)((function(){f().then((function(e){u(e)}))}),[]);return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(C,{message:M}),r.a.createElement(N,{errorMessage:T}),r.a.createElement(v,{text:"filter shown with",value:S,onChange:function(e){x(e.target.value)}}),r.a.createElement("h3",null,"Add a new"),r.a.createElement(p,{onSubmit:function(e){if(e.preventDefault(),""===i)return null;var n=t.find((function(e){return e.name===i}));if(void 0===n){if(""===w)return window.alert("Please enter a number."),null;d({name:i,number:w}).then((function(e){u(t.concat(e)),m(""),j(""),A("Added ".concat(e.name))})),setTimeout((function(){A(null)}),5e3)}else{if(""===w||n.number===w)return window.alert("".concat(i," is already added to phonebook")),null;if(window.confirm("".concat(i," is already added to phonebook, \n          replace the old number with a new one?"))){var a={name:i,number:w};b(n.id,a).then((function(e){return u(t.map((function(t){return t.id!==n.id?t:e})))})).catch((function(e){U("".concat(n.name," was already removed from server.")),setTimeout((function(){U(null)}),5e3),u(t.filter((function(e){return e.id!==n.id})))}))}}},newName:i,onNameChange:function(e){m(e.target.value)},newNumber:w,onNumberChange:function(e){j(e.target.value)}}),r.a.createElement("h3",null,"Numbers"),r.a.createElement(g,{persons:t,filterName:S,deletePerson:function(e){var n=t.find((function(n){return n.id===e})).name;window.confirm("Delete ".concat(n,"?"))&&h(e).then((function(e){u(e)}))}}))};o.a.render(r.a.createElement(j,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.d0f80ce2.chunk.js.map