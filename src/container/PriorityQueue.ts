import { AdaptorContainer } from "../base/container/AdaptorContainer";

import { Vector } from "./Vector";
import { IForwardIterator } from "../iterator/IForwardIterator";
import { less } from "../functional/comparators";
import { pop_heap, push_heap } from "../algorithm/heap";

/**
 * Priority Queue; Greater Out First.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export class PriorityQueue<T>
	extends AdaptorContainer<T, Vector<T>, PriorityQueue<T>>
{
	/**
	 * @hidden
	 */
	private comp_: (x: T, y: T) => boolean;

	/* ---------------------------------------------------------
		CONSTURCTORS
	--------------------------------------------------------- */
	/**
	 * Default Constructor.
	 * 
	 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Note that, because *equality* is predicated by `!comp(x, y) && !comp(y, x)`, the function must not cover the *equality* like `<=` or `>=`. It must exclude the *equality* like `<` or `>`. Default is {@link less}.
	 */
	public constructor(comp?: (x: T, y: T) => boolean);

	/**
	 * Copy Constructor.
	 * 
	 * @param obj Object to copy.
	 */
	public constructor(obj: PriorityQueue<T>);

	/**
	 * Range Constructor.
	 * 
	 * @param first Input iterator of the first position.
	 * @param last Input iterator of the last position.
	 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Note that, because *equality* is predicated by `!comp(x, y) && !comp(y, x)`, the function must not cover the *equality* like `<=` or `>=`. It must exclude the *equality* like `<` or `>`. Default is {@link less}.
	 */
	public constructor
	(
		first: Readonly<IForwardIterator<T>>, 
		last: Readonly<IForwardIterator<T>>, 
		comp?: (x: T, y: T) => boolean
	);

	public constructor(...args: any[])
	{
		super();

		// DECLARE MEMBERS
		let comp: (x: T, y: T) => boolean = less;
		let post_process: () => void = null;

		//----
		// INITIALIZE MEMBERS AND POST-PROCESS
		//----
		// BRANCH - METHOD OVERLOADINGS
		if (args.length === 1 && args[0] instanceof PriorityQueue)
		{
			let obj: PriorityQueue<T> = args[0];
			
			comp = obj.comp_;
			post_process = () => 
			{
				let first = obj.source_.begin();
				let last = obj.source_.end();

				this.source_.assign(first, last);
			};
		}
		else if (args.length >= 2 && args[0].next instanceof Function && args[1].next instanceof Function)
		{
			// FUNCTION TEMPLATE
			if (args.length === 3)	comp = args[2];

			post_process = () =>
			{
				// RANGE CONSTRUCTOR
				let first: Readonly<IForwardIterator<T>> = args[0]; // PARAMETER 1
				let last: Readonly<IForwardIterator<T>> = args[1]; // PARAMETER 2

				this.source_.assign(first, last);
			};
		}
		else if (args.length === 1)
			comp = args[0];

		//----
		// DO PROCESS
		//----
		// CONSTRUCT CONTAINER
		this.source_ = new Vector<T>();
		this.comp_ = comp;

		// ACT POST-PROCESS
		if (post_process !== null)
			post_process();
	}

	/* ---------------------------------------------------------
		ACCESSORS
	--------------------------------------------------------- */
	/**
	 * Get value comparison function.
	 */
	public value_comp(): (x: T, y: T) => boolean
	{
		return this.comp_;
	}

	/**
	 * Get top element.
	 */
	public top(): T
	{
		return this.source_.front();
	}

	/* ---------------------------------------------------------
		ELEMENTS I/O
	--------------------------------------------------------- */
	/**
	 * @inheritDoc
	 */
	public push(...elems: T[]): number
	{
		for (let elem of elems)
		{
			this.source_.push_back(elem);
			push_heap(this.source_.begin(), this.source_.end(), this.comp_);
		}
		return this.size();
	}
	
	/**
	 * @inheritDoc
	 */
	public pop(): void
	{
		pop_heap(this.source_.begin(), this.source_.end(), this.comp_);
		this.source_.pop_back();
	}

	/**
	 * @inheritDoc
	 */
	public swap(obj: PriorityQueue<T>): void
	{
		super.swap(obj);
		[this.comp_, obj.comp_] = [obj.comp_, this.comp_];
	}
}