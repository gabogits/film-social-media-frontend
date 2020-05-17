export function keysAppend(object) {
  const data = new FormData();
  const keys = Object.keys(object);
  for (const key of keys) {
    console.log(key, object[key])  
      data.append(key, object[key]);

  }

  return data;
}


export  const  localeFunc = (number, index) => {
  return [
      ['justo ahora', 'en un rato'],
      ['hace %s segundos', 'en %s segundos'],
      ['hace 1 minuto', 'en 1 minuto'],
      ['hace %s minutos', 'en %s minutos'],
      ['hace 1 hora', 'en 1 hora'],
      ['hace %s horas', 'en %s horas'],
      ['hace 1 día', 'en 1 día'],
      ['hace %s días', 'en %s días'],
      ['hace 1 semana', 'en 1 semana'],
      ['hace %s semanas', 'en %s semanas'],
      ['hace 1 mes', 'en 1 mes'],
      ['hace %s meses', 'en %s meses'],
      ['hace 1 año', 'en 1 año'],
      ['hace %s años', 'en %s años'],
  ][index];
}

export const formatURL = (string) => {
  if (string) {
    const words = string.split(" ");
    let newString = "";
    for (const  word of words) {
      if (
        word.indexOf("http://") >= 0 ||
        word.indexOf("https://") >= 0
      ) {
        newString = `${newString} <a href ="${word}" target="_blank"> ${word}</a> `;
      } else {
        newString = newString + " " + word;
      }
    }
    return { __html: newString };
  }
};