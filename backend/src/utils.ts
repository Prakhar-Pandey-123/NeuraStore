export function random(len:number){
    let options="asdaseqwhfasnfkheafla12123123445654678";
    let length=options.length;
    let ans="";//to store the result
    for(let i=0;i<len;i++){
        ans+=options[Math.floor(Math.random()*length)];
    }
    return ans;
}