document.addEventListener("DOMContentLoaded",function(){const bar=document.getElementById("bar"),close=document.getElementById("close"),nav=document.getElementById("navbar");if(bar&&nav)bar.onclick=()=>nav.classList.add("active");if(close&&nav)close.onclick=e=>{e.preventDefault();nav.classList.remove("active")};const KEY="zgCart",get=()=>{try{return JSON.parse(localStorage.getItem(KEY))||[]}catch(e){return[]}},save=c=>localStorage.setItem(KEY,JSON.stringify(c));function add(p){let c=get(),x=c.find(i=>i.id===p.id);x?x.quantity+=p.quantity||1:c.push({...p,quantity:p.quantity||1});save(c);alert(p.name+" added to cart.");count()}function count(){let n=get().reduce((a,i)=>a+Number(i.quantity||0),0);document.querySelectorAll('a[href="cart.html"]').forEach(a=>{let b=a.querySelector(".cart-count");if(!b){b=document.createElement("span");b.className="cart-count";b.style.cssText="margin-left:4px;color:#088178;font-weight:700";a.appendChild(b)}b.textContent=n?"("+n+")":""})}document.querySelectorAll(".pro .cart").forEach(i=>i.closest("a")?.addEventListener("click",e=>{e.preventDefault();e.stopPropagation();let c=i.closest(".pro"),name=c?.querySelector("h5")?.textContent.trim()||"Product",price=parseFloat((c?.querySelector("h4")?.textContent||"").replace(/[^0-9.]/g,""))||0,image=c?.querySelector("img")?.getAttribute("src")||"";add({id:image+"|"+name,name,price,image})}));let ab=document.querySelector("#prodetails .single-pro-details button");if(ab)ab.addEventListener("click",()=>{let image=document.getElementById("MainImg")?.src||"",name=document.querySelector("#prodetails .single-pro-details h4")?.textContent.trim()||"Product",price=parseFloat((document.querySelector("#prodetails .single-pro-details h2")?.textContent||"").replace(/[^0-9.]/g,""))||0,size=document.querySelector("#prodetails select")?.value||"",quantity=Math.max(1,parseInt(document.querySelector("#prodetails input")?.value,10)||1);add({id:image+"|"+name+"|"+size,name,price,image,size,quantity})});const body=document.getElementById("cartBody");if(body){let discount=0;function render(){let c=get();body.innerHTML="";let empty=document.getElementById("cart-empty"),table=document.querySelector("#cart table");if(!c.length){empty.style.display="block";table.style.display="none";["cartSubtotal","shipping","cartTotal"].forEach(id=>document.getElementById(id).textContent="₹0.00");return}empty.style.display="none";table.style.display="table";let sub=0;c.forEach((x,k)=>{let s=x.price*x.quantity;sub+=s;let r=document.createElement("tr");r.innerHTML=`<td><a href="#" class="remove-item" data-index="${k}"><i class="far fa-times-circle"></i></a></td><td><img src="${x.image}" alt=""></td><td>${x.name}${x.size?"<br><small>Size: "+x.size+"</small>":""}</td><td>₹${x.price.toFixed(2)}</td><td><input class="cart-qty" type="number" min="1" value="${x.quantity}" data-index="${k}"></td><td>₹${s.toFixed(2)}</td>`;body.appendChild(r)});let ship=sub?10:0,total=Math.max(0,sub+ship-discount);document.getElementById("cartSubtotal").textContent="₹"+sub.toFixed(2);document.getElementById("shipping").textContent="₹"+ship.toFixed(2);document.getElementById("cartTotal").textContent="₹"+total.toFixed(2);document.querySelectorAll(".remove-item").forEach(b=>b.onclick=e=>{e.preventDefault();let c=get();c.splice(+b.dataset.index,1);save(c);render();count()});document.querySelectorAll(".cart-qty").forEach(i=>i.onchange=()=>{let c=get();c[+i.dataset.index].quantity=Math.max(1,parseInt(i.value,10)||1);save(c);render();count()})}document.getElementById("applyCoupon")?.addEventListener("click",()=>{let code=document.getElementById("couponCode").value.trim().toUpperCase(),m=document.getElementById("couponMessage");discount=code==="ZG10"?10:0;m.textContent=code==="ZG10"?"Coupon applied: ₹10 off.":"Invalid coupon code.";render()});document.getElementById("checkoutBtn")?.addEventListener("click",()=>alert(get().length?"Checkout is ready for the college project. Connect a payment system here when required.":"Your cart is empty."));render()}const form=document.getElementById("contactForm");if(form)form.onsubmit=e=>{e.preventDefault();document.getElementById("contactMessageStatus").textContent="Thank you! Your message has been submitted.";form.reset()};count()});


// Checkout / payment demo
const checkoutForm = document.getElementById("checkoutForm");
if (checkoutForm) {
    const cart = getCart();
    if (!cart.length) { window.location.href = "cart.html"; }

    const subtotal = cart.reduce((sum,item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 0 ? 10 : 0;
    document.getElementById("checkoutSubtotal").textContent = "₹" + subtotal.toFixed(2);
    document.getElementById("checkoutShipping").textContent = "₹" + shipping.toFixed(2);
    document.getElementById("checkoutTotal").textContent = "₹" + (subtotal + shipping).toFixed(2);

    document.querySelectorAll('input[name="payment"]').forEach(function(radio){
        radio.addEventListener("change", function(){
            document.querySelectorAll(".payment-box").forEach(box => box.classList.remove("active"));
            const box = document.getElementById(this.value + "Box");
            if(box) box.classList.add("active");
        });
    });

    checkoutForm.addEventListener("submit", function(event){
        event.preventDefault();
        const method = document.querySelector('input[name="payment"]:checked')?.value;
        if(!method){ alert("Please select a payment method."); return; }
        const orderId = "ZG" + Date.now().toString().slice(-8);
        document.getElementById("orderNumber").textContent = orderId;
        document.getElementById("checkout-page").style.display = "none";
        document.getElementById("payment-success").style.display = "block";
        localStorage.removeItem("zgCart");
    });
}
