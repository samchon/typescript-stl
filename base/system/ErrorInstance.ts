﻿namespace std.base.system
{
	/**
	 * <p> An abstract error instance. </p> 
	 *
	 * <p> <code>ErrorInstance</code> is an abstract class of <code>ErrorCode</code> and <code>ErrorCondition</code> 
	 * holding an error instance's identifier <code>value</code>, associated with a <code>category</code>. </p>
	 *
	 * <p> The operating system and other low-level applications and libraries generate numerical error codes to 
	 * represent possible results. These numerical values may carry essential information for a specific platform, 
	 * but be non-portable from one platform to another. </p>
	 *
	 * <p> Objects of this class associate such numerical codes to <code>error categories</code>, so that they 
	 * can be interpreted when needed as more abstract (and portable) <code>error conditions</code>. </p>
	 *
	 * <ul>
	 *	<li> Reference: http://www.cplusplus.com/reference/system_error/error_code/ </li>
	 *	<li> Reference: http://www.cplusplus.com/reference/system_error/error_condition/ </li>
	 * </ul>
	 *
	 * @author Jeongho Nam
	 */
	export class ErrorInstance
	{
		/**
		 * A reference to an <code>ErrorCategory</code> object.
		 */
		protected category_: ErrorCategory;

		/**
		 * A numerical value identifying an error instance.
		 */
		protected value_: number;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * Default Constructor.
		 */
		public constructor();

		/**
		 * Construct from a numeric value and error category. 
		 *
		 * @param val A numerical value identifying an error instance.
		 * @param category A reference to an <code>ErrorCategory</code> object.
		 */
		public constructor(val: number, category: ErrorCategory);

		public constructor(val: number = 0, category: ErrorCategory = null)
		{
			this.assign(val, category);
		}

		/**
		 * <p> Assign error instance. </p>
		 *
		 * <p> Assigns the <code>ErrorCode</code> object a value of val associated with the <code>ErrorCategory.</code> </p> 
		 *
		 * @param val A numerical value identifying an error instance.
		 * @param category A reference to an <code>ErrorCategory</code> object.
		 */
		public assign(val: number, category: ErrorCategory): void
		{
			this.category_ = category;
			this.value_ = val;
		}

		/**
		 * <p> Clear error instance. </p>
		 *
		 * <p> Clears the value in the <code>ErrorCode</code> object so that it is set to a value of 
		 * <i>0</i> of the <code>ErrorCategory.systemCategory()</code> (indicating no error).
		 */
		public clear(): void
		{
			this.value_ = 0;
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		/**
		 * <p> Get category. </p>
		 *
		 * <p> Returns a reference to the <code>ErrorCategory</code> associated with the <code>ErrorCode</code> 
		 * object. </p>
		 *
		 * @return A reference to a non-copyable object of a type derived from <code>ErrorCategory</code>.
		 */
		public category(): ErrorCategory
		{
			return this.category_;
		}

		/**
		 * <p> Error value. </p>
		 *
		 * <p> Returns the error value associated with the <code>ErrorCode</code> object. </p>
		 * 
		 * @return The error value.
		 */
		public value(): number
		{
			return this.value_;
		}

		/**
		 * <p> Get message. </p>
		 *
		 * <p> Returns the message associated with the error instance. </p>
		 *
		 * <p> Error messages are defined by the <code>category</code> the error instance belongs to. </p>
		 *
		 * <p> This function returns the same as if the following member was called: </p>
		 *
		 * <p> <code>category().message(value())</code> </p>
		 *
		 * @return A <code>string</code> object with the message associated with the <code>ErrorCode</code>.
		 */
		public message(): string
		{
			if (this.category_ == null || this.value_ == 0)
				return "";
			else
				return this.category_.message(this.value_);
		}

		/**
		 * <p> Default error condition. </p>
		 *
		 * <p> Returns the default <code>ErrorCondition</code> object associated with the <code>ErrorCode</code> 
		 * object. </p>
		 *
		 * <p> This function returns the same as if the following member was called: </p>
		 *
		 * <p> <code>category().default_error_condition(value())</code> </p>
		 *
		 * <p> <code>ErrorCategory.defaultErrorCondition()</code> is a virtual member function, that can operate 
		 * differently for each category. </p>
		 * 
		 * @return An <code>ErrorCondition</code> object that corresponds to the <code>ErrorCode</code> object.
		 */
		public defaultErrorCondition(): ErrorCondition
		{
			if (this.category_ == null || this.value_ == 0)
				return null;
			else
				return this.category_.defaultErrorCondition(this.value_);
		}

		/* ---------------------------------------------------------
			OPERATORS
		--------------------------------------------------------- */
		/**
		 * <p> Convert to bool. </p>
		 *
		 * <p> Returns whether the error instance has a numerical <code>value</code> other than 0. </p>
		 *
		 * If it is zero (which is generally used to represent no error), the function returns false, otherwise it returns true.
		 *
		 * @return <code>true</code> if the error's numerical value is not zero. 
		 *		   <code>false</code> otherwise.
		 */
		public toBoolean(): boolean
		{
			return this.value_ != 0;
		}
	}
}