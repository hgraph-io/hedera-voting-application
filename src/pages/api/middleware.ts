import cookieParser from 'cookie-parser';

export default function (req, res, next) {
  cookieParser()(req, res, next);
}
