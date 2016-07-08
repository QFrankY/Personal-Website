var properties = {
	firstName: {type: String, required: true}
};

var options = {
	relations: {
		accessTokens: {
			model: accessToken,
			type: hasMany,
			foreignKey: userId
		},
		account: {
			model: account,
			type: belongsTo
		},
		transactions: {
			model: transaction,
			type: hasMany
		}
	},
	acls: [
		{
			permission: ALLOW,
			principalType: ROLE,
			principalId: $everyone,
			property: myMethod
		}
	]
};

var user = loopback.Model.extend('user', properties, options);