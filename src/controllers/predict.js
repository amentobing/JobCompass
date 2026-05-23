import ClientError from '../exceptions/client-error.js';
import { predictCV } from '../handlers/predictHandler.js';
import { saveResume } from '../utils/db.js';

export default async function predictCVController(req, res) {
  if (!req.file || !req.file.buffer) {
    throw new ClientError('Tidak dapat menemukan file PDF', 400);
  }

  const cv = req.file.buffer;
  const { prediction, parsedText } = await predictCV(cv);

  // const resumeResult = await saveResume({
  //   userId: req.user.id,
  //   filename: req.file.originalname,
  //   parsedText,
  // });

  // if (resumeResult.status === 'fail') {
  //   return res.status(400).json({
  //     status: 'fail',
  //     message: resumeResult.message,
  //   });
  // }

  res.json({
    status: 'success',
    message: 'File uploaded successfully',
    data: {
      prediction,
      // resume: resumeResult.data,
    },
  });
}
