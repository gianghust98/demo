/* シーザーー暗号化 */
export function caesar(val, key) {
  // console.log(val); 
  val = encodeURIComponent(val);
  var result = "";
  for (var i = 0; i < val.length; i++) {
    result += String.fromCharCode(val.charCodeAt(i) + key);
  }
  return result;
}

/* シーザー復号化 */
export function decaesar(val, key) {
  // console.log(val);
  var result = "";
  for (var i = 0; i < val.length; i++) {
    result += String.fromCharCode(val.charCodeAt(i) - key);
  }
  return decodeURIComponent(result) ;
}