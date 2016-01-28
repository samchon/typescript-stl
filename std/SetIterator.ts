﻿/// <refe0rence path="Iterator.ts" />

/// <reference path="SetContainer.ts" />
/// <reference path="ListIterator.ts" />

namespace std
{
    /**
     * <p> An iterator of a Set. </p>
     * 
     * @author Jeongho Nam
     */
    export class SetIterator<T>
        extends Iterator<T>
    {
        private it: ListIterator<T>;

        /**
         * <p> Construct from source and index number. </p>
         *
         * <h4> Note </h4>
         * <p> Do not create iterator directly. </p>
         * <p> Use begin(), find() or end() in Map instead. </p> 
         *
         * @param map The source Set to reference.
         * @param index Sequence number of the element in the source Set.
         */
        public constructor(source: SetContainer<T>, it: ListIterator<T>)
        {
            super(source);

            this.it = it;
        }

        public getListIterator(): ListIterator<T>
        {
            return this.it;
        }

        /* ---------------------------------------------------------
		    MOVERS
	    --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        public prev(): Iterator<T>
        {
            return new SetIterator<T>(<SetContainer<T>>this.source, <ListIterator<T>>this.it.prev());
        }

        /**
         * @inheritdoc
         */
        public next(): Iterator<T>
        {
            return new SetIterator<T>(<SetContainer<T>>this.source, <ListIterator<T>>this.it.next());
        }

        /**
         * @inheritdoc
         */
        public advance(size: number): Iterator<T>
        {
            return new SetIterator<T>(<SetContainer<T>>this.source, <ListIterator<T>>this.it.advance(size));
        }

        /* ---------------------------------------------------------
		    ACCESSORS
	    --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        public equals<U extends T>(obj: Iterator<U>): boolean 
        {
            return super.equals(obj) && this.it == (<SetIterator<U>>obj).it;
        }

        /**
         * @inheritdoc
         */
        public get value(): T
        {
            return this.it.value;
        }

        /**
         * @inheritdoc
         */
        public set value(val: T)
        {
            this.it.value = val;
        }
    }
}