const factory = (date) => {
  let unix, utc;
  if (date === '') {
    utc = new Date().toUTCString();
    unix = new Date();
  }
  if (date.includes('-')) {
    utc = new Date(date).toUTCString();
    unix = new Date(date).getTime();
  } else {
    utc = new Date(Number.parseInt(date)).toUTCString();
    unix = date;
  }

  console.log(unix, utc);
};

// factory('2015-12-25');
// factory('1451001600000');

console.log(new Date('05 October 2011').toUTCString());
