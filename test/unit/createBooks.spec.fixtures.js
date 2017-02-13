import csvjson from 'csvjson';

const csvString = `title,type,author,numberPages,dateOfPub,url,isbn,siteLocation,numberOfCopies,comments
title1,type1,author1,numberPages1,dateOfPub1,url1,isbn1,siteLocation1,numberOfCopies1,comments1
title2,type2,author2,numberPages2,dateOfPub2,url2,isbn2,siteLocation2,numberOfCopies2,comments2`;

const csvJson = csvjson.toObject(csvString);

export const csvFixture = {
  string: csvString,
  json: csvJson
};
