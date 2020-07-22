module es {
    export class Transform {
        /** 与此转换关联的实体 */
        public readonly entity: Entity;

        private _parent: Transform;
        /**
         * 获取此转换的父转换
         */
        public get parent() {
            return this._parent;
        }

        /**
         * 设置此转换的父转换
         * @param value
         */
        public set parent(value: Transform) {
            this.setParent(value);
        }

        /**
         * 这个转换的所有子元素
         */
        public get childCount() {
            return this._children.length;
        }

        /**
         * 变换在世界空间中的位置
         */
        public position: Vector2;
        /**
         * 变换在世界空间的旋转度
         */
        public rotation: number;
        /**
         * 变换在世界空间的缩放
         */
        public scale: Vector2;
        public _children: Transform[];

        constructor(entity: Entity) {
            this.entity = entity;
            this.scale = Vector2.one;
            this._children = [];
        }

        /**
         * 返回在索引处的转换子元素
         * @param index
         */
        public getChild(index: number): Transform {
            return this._children[index];
        }

        /**
         * 设置此转换的父转换
         * @param parent
         */
        public setParent(parent: Transform): Transform {
            if (this._parent == parent)
                return this;

            if (!this._parent) {
                this._parent._children.remove(this);
                this._parent._children.push(this);
            }

            this._parent = parent;

            return this;
        }

        /**
         * 设置转换在世界空间中的位置
         * @param x
         * @param y
         */
        public setPosition(x: number, y: number): Transform {
            this.position = new Vector2(x, y);
            return this;
        }

        /**
         * 设置变换在世界空间的旋转度
         * @param degrees
         */
        public setRotation(degrees: number): Transform {
            this.rotation = degrees;
            return this;
        }

        /**
         * 设置变换在世界空间中的缩放
         * @param scale
         */
        public setScale(scale: Vector2): Transform {
            this.scale = scale;
            return this;
        }

        /**
         * 旋转精灵的顶部，使其朝向位置
         * @param pos
         */
        public lookAt(pos: Vector2) {
            let sign = this.position.x > pos.x ? -1 : 1;
            let vectorToAlignTo = Vector2.normalize(Vector2.subtract(this.position, pos));
            this.rotation = sign * Math.acos(Vector2.dot(vectorToAlignTo, Vector2.unitY));
        }

        /**
         * 对精灵坐标进行四舍五入
         */
        public roundPosition() {
            this.position = this.position.round();
        }

        /**
         * 从另一个transform属性进行拷贝
         * @param transform
         */
        public copyFrom(transform: Transform) {
            this.position = transform.position;
            this.rotation = transform.rotation;
            this.scale = transform.scale;
        }
    }
}

module Transform {
    export enum Component {
        position,
        scale,
        rotation,
    }
}