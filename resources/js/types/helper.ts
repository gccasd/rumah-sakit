export const debounce = (func: Function, delay: number) => {
    let timer: any;
    return (...args: any[]) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    };
};

export const isPageNumber = (url: string, pattern: string) => {
    const regx = new RegExp('^'+pattern + "\\/\\d+$");
    console.log(regx.test(url))
    if (regx.test(url)) return true;
    return false;
}

export const toDate = (timeStamp: number): string => {
    const date = new Date(timeStamp);
  
    return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Asia/Jakarta', 
      });
};
export const rupiahFormat = (rp: number|any) => {
    if (isNaN(rp)) {
      return "Invalid number";
    }
  
    const formattedNumber = rp.toFixed(2);
  
    const reversed = formattedNumber.split("").reverse().join("");
  
    let formattedRupiah = reversed.replace(/(\d{3}(?!$))/g, "$1,");
  
    formattedRupiah = formattedRupiah.split("").reverse().join("");
  
    return `Rp. ${formattedRupiah}`;
  }  
