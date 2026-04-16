/**
 * Utility to convert numbers to Vietnamese words
 */
export const numberToVietnameseWords = (num: number): string => {
    if (num === 0) return "không đồng";

    const units = ["", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];

    const parts = [];
    const bil = Math.floor(num / 1000000000);
    let rem = num % 1000000000;
    const mil = Math.floor(rem / 1000000);
    rem = rem % 1000000;
    const tho = Math.floor(rem / 1000);
    rem = rem % 1000;

    const readHundred = (n: number, full: boolean) => {
        let str = "";
        const h = Math.floor(n / 100);
        const t = Math.floor((n % 100) / 10);
        const u = n % 10;
        
        if (h > 0 || full) {
            str += (h === 0 ? "không" : units[h]) + " trăm ";
        }
        
        if (t === 0 && u > 0 && (h > 0 || full)) {
            str += "linh ";
        } else if (t === 1) {
            str += "mười ";
        } else if (t > 1) {
            str += units[t] + " mươi ";
        }
        
        if (u === 1 && t > 1) {
            str += "mốt";
        } else if (u === 5 && t > 0) {
            str += "lăm";
        } else if (u > 0) {
            str += units[u];
        }
        return str.replace(/\s+/g, " ").trim();
    };

    if (bil > 0) {
        parts.push(readHundred(bil, false) + " tỷ");
    }
    if (mil > 0) {
        parts.push(readHundred(mil, bil > 0) + " triệu");
    }
    if (tho > 0) {
        parts.push(readHundred(tho, bil > 0 || mil > 0) + " nghìn");
    }
    if (rem > 0 || parts.length === 0) {
        const lastPart = readHundred(rem, parts.length > 0);
        if (lastPart) parts.push(lastPart);
    }

    if (parts.length === 0) {
        return "không đồng";
    }
    
    let res = parts.join(" ");
    res = res.charAt(0).toUpperCase() + res.slice(1);
    return res + " đồng";
};

/**
 * Format date string to DD/MM/YYYY
 */
export const formatDate = (dateStr?: string): string => {
    if (!dateStr) return "........";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
};
