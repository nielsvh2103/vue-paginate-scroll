export default{
	name: 'vue-paginate-scroll',

	props: {
		src: { type: Array, required: true },
		perScroll: { type: Number, default: 10 },
		observerOptions: {
			type: Object, 
			default: () => {threshold: .75}
		}
	},

	data(){
		return{
			observer: null,
			currentScroll: 0,
			lastScroll: null,
			data: []
		}
	},

	watch: {
		src: function (newSrc, oldSrc) {
			this.data = [];
			this.currentScroll = 0;
			this.lastScroll = null;

			this.addNextChunk();
		}
	},

	methods: {
	init(){
		this.lastScroll = Math.round(this.src.length / this.perScroll);
	},

	initObserver(){
		this.observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if(entry && entry.isIntersecting){
					this.addNextChunk();

					if(this.lastScroll === this.currentScroll){
						this.observer.disconnect();
					}
				}
			});
		}, this.observerOptions);

		this.observer.observe(this.$refs['scroll-observer']);
	},

	addNextChunk(){
		const start = this.perScroll * (this.currentScroll);
		const end = start + this.perScroll;

		if(start < this.src.length){
			const chunk = this.src.slice(start, end);
			this.data.push(...chunk);
			this.currentScroll++;
		}
	}
	},

	created(){
		this.init();
		this.addNextChunk();
	},

	mounted(){
		this.initObserver();
	},

	beforeDestroy(){
		this.observer.disconnect();
	},

	render(h){
		const content = h('div', {
				staticClass: 'vue-infinite-scroll__content',
			},
			this.$scopedSlots.default({ 
				data: this.data, 
				currentScroll: this.currentScroll, 
				lastScroll: this.lastScroll 
			})
		);

		const scrollObserver = h('div', {
			ref: 'scroll-observer'
		});

		return h('div', {
			staticClass: 'vue-infinite-scroll'
		}, [content, scrollObserver]);
	}
}