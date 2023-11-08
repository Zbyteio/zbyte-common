/**
 * returns formatted value of Number or BigNumber as string.
 * for example,
 * 1234.1234 will be returned as 1,234.12
 * 1234.1 will be returned as 1,234.10
 * 1234 will be returned as 1,234.00
 * 123 will be returned as 123.00
 * @param amount string representation of Number or BigNumber
 * @returns formatted string of Number or BigNumber
 */
export function formatZbyteToken(amount: string) {
	try {
		// index of decimal in the string
		const dotIndex = amount.indexOf('.');
		// index upto which the string should be trimmed after the dot
		// adding 3 because index of dot is also counted
		const trimIndex = dotIndex == -1 ? amount.length : dotIndex + 3;
		/**
		 * if number string has decimal in it,
		 * then lastIndexOfNumberWithoutDecimal is index of decimal,
		 * else it is length of number string
		 * this is used for making comma separated group of 3s
		 */
		const lastIndexOfNumberWithoutDecimal = dotIndex == -1 ? amount.length : dotIndex;
		// initial formatted value
		let newValue = '0.0';
		/**
		 * array to push group of 3s,
		 * if a number is 12345, its group of 3s is 12 and 345
		 */
		const groupOf3s: string[] = [];
		if (lastIndexOfNumberWithoutDecimal <= amount.length) {
			let i = lastIndexOfNumberWithoutDecimal % 3;
			const aGroupOf3 = amount.substring(0, i);
			if (aGroupOf3 != '') {
				/**
				 * separate number string into group 3s
				 * this initial code handles any strays,
				 * which will be ignored by for loop
				 * e.g., in 12345, for loop will ignore 12
				 * this 12 is handled here
				 */
				groupOf3s.push(aGroupOf3);
			}
			for (; i <= lastIndexOfNumberWithoutDecimal - 1; i = i + 3) {
				// separate number string into group 3s
				const aGroupOf3 = amount.substring(i, i + 3);
				groupOf3s.push(aGroupOf3);
			}
		}
		// convert array to formatted string by joining with delimiter ","
		newValue = groupOf3s.join(',');
		// add first two digits after the decimal to formatted string
		newValue = newValue.concat(amount.substring(lastIndexOfNumberWithoutDecimal, trimIndex));

		// if number string does not have decimal, add ".0" to the end
		if (dotIndex == -1) newValue = `${newValue}.00`;
		// if number string has decimal at the end, add "0" to the end
		else if (newValue.charAt(newValue.length - 1) == '.') newValue = `${newValue}00`;
		// if number string has only one digit after decimal, add another "0" to the end to show two digits after decimal
		else if (dotIndex == amount.length - 2) newValue = `${newValue}0`;

		// return final formatted value
		return newValue;
	} catch (e) {
		console.error(e);
	}
	// default return same amount string on exception
	return amount;
}

/**
 * returns formatted value of Number or BigNumber as string.
 * for example,
 * 1234.1234 will be returned as 1,234.12+
 * 1234.1 will be returned as 1,234.10
 * 1234 will be returned as 1,234.00
 * 123 will be returned as 123.00
 * @param amount string representation of Number or BigNumber
 * @returns formatted string of Number or BigNumber
 */
export function formatZbyteTokenWithPlus(amount: string) {
	try {
		// index of decimal in the string
		const dotIndex = amount.indexOf('.');
		// index upto which the string should be trimmed after the dot
		// adding 3 because index of dot is also counted
		const trimIndex = dotIndex == -1 ? amount.length : dotIndex + 3;
		/**
		 * if number string has decimal in it,
		 * then lastIndexOfNumberWithoutDecimal is index of decimal,
		 * else it is length of number string
		 * this is used for making comma separated group of 3s
		 */
		const lastIndexOfNumberWithoutDecimal = dotIndex == -1 ? amount.length : dotIndex;
		// initial formatted value
		let newValue = '0.0';
		/**
		 * array to push group of 3s,
		 * if a number is 12345, its group of 3s is 12 and 345
		 */
		const groupOf3s: string[] = [];
		if (lastIndexOfNumberWithoutDecimal <= amount.length) {
			let i = lastIndexOfNumberWithoutDecimal % 3;
			const aGroupOf3 = amount.substring(0, i);
			if (aGroupOf3 != '') {
				/**
				 * separate number string into group 3s
				 * this initial code handles any strays,
				 * which will be ignored by for loop
				 * e.g., in 12345, for loop will ignore 12
				 * this 12 is handled here
				 */
				groupOf3s.push(aGroupOf3);
			}
			for (; i <= lastIndexOfNumberWithoutDecimal - 1; i = i + 3) {
				// separate number string into group 3s
				const aGroupOf3 = amount.substring(i, i + 3);
				groupOf3s.push(aGroupOf3);
			}
		}
		// convert array to formatted string by joining with delimiter ","
		newValue = groupOf3s.join(',');
		// add first two digits after the decimal to formatted string
		newValue = newValue.concat(amount.substring(lastIndexOfNumberWithoutDecimal, trimIndex));

		if (dotIndex != -1) {
			if (amount.length > trimIndex) {
				/**
				 * add plus sign if digits after 2nd place
				 * after decimal make non-zero value
				 * e.g., if number is 1.1234, it will be formatted into 1.12+
				 * if number is 1.1200, it will be formatted into 1.12
				 * if number is 1.1 it will be formatted into 1.1
				 */
				let showPlus = false;
				for (let i = trimIndex; i < amount.length; ++i) {
					if (Number(amount.charAt(i)) > 0) {
						showPlus = true;
						break;
					}
				}
				if (showPlus) newValue += '+';
			}
		}

		// if number string does not have decimal, add ".0" to the end
		if (dotIndex == -1) newValue = `${newValue}.00`;
		// if number string has decimal at the end, add "0" to the end
		else if (newValue.charAt(newValue.length - 1) == '.') newValue = `${newValue}00`;
		// if number string has only one digit after decimal, add another "0" to the end to show two digits after decimal
		else if (dotIndex == amount.length - 2) newValue = `${newValue}0`;

		// return final formatted value
		return newValue;
	} catch (e) {
		console.error(e);
	}
	// default return same amount string on exception
	return amount;
}
