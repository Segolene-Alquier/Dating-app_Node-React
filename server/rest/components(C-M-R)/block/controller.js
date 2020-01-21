const Block = require('./model');

const blocks = new Block();

// async function getBlocksFromCurrentUser(request, response) {
//   const id = request.decoded.userid;
//   try {
//     const call = await blocks.getBy('blockingUser', id);
//     response.status(200).json(call);
//   } catch (err) {
//     console.log(err);
//     response.status(206).send(err);
//   }
// }

async function blockUnblockUserId(request, response) {
  console.log('call block function');
  const blockingUser = request.decoded.userid;
  const blockedUser = parseInt(request.params.id, 10);
  if (blockedUser === blockingUser) {
    return response
      .status(200)
      .json({ success: false, error: 'You can not block yourself!' });
  }
  try {
    const alreadyBlocked = await blocks.exists(blockingUser, blockedUser);
    let query;
    if (alreadyBlocked) {
      query = await blocks.delete(blockingUser, blockedUser);
    } else {
      query = await blocks.create(blockingUser, blockedUser);
    }
    response.status(200).json(query);
  } catch (err) {
    console.log(err);
    response.status(206).send(err);
  }
}

// module.exports.getBlocksFromCurrentUser = getBlocksFromCurrentUser;
module.exports.blockUnblockUserId = blockUnblockUserId;
