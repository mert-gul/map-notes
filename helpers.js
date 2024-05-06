 export const setStorage = (data) => {
    const strData = JSON.stringify(data);

    localStorage.setItem("notes", strData);
 };

 var carIcon = L.icon({
   iconUrl:"car.png",
   iconSize:[50,60],
 });

 var homeIcon = L.icon({
   iconUrl:"home-marker.png",
   iconSize:[50,60],
 });
 var jobIcon = L.icon({
   iconUrl:"job.png",
   iconSize:[50,60],
 });
 var visitIcon = L.icon({
   iconUrl:"visit.png",
   iconSize:[50,60],
 });

 export function detecIcon(type) {
   switch(type) {
      case "park":
         return carIcon;
         case "home":
            return homeIcon;
            case "job":
               return jobIcon;
               case "goto":
                  return visitIcon;
   }
 }

 export const detecType = (type) => {
   switch(type){
      case "park":
         return "park yeri";
         case "home":
            return "Ev"; 
            case "job":
               return "İş";
               case "goto":
                  return "Ziyaret";
   }

 };