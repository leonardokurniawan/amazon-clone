import React from 'react';
import './Home.css';
import Product from './Product';

function Home() {
	return (
		<div className="home">
			<div className="home__container">
				<img
					alt="Banner"
					className="home__image"
					src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg?fbclid=IwAR3HVGJmXhu4yELHIYPGIhN7gIrpa1H0pK-xE4lh9o5u1BnGKtlwnh0Zf2k"
				/>
				<div className="home__row">
					{/* Product */}
					<Product
						id={154823}
						title="The Lean Startup: How Constant Innovation Creates Radically Successful Businesses Paperback"
						price={10.31}
						image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg"
						rating={5}
					/>
					<Product
						id={219229}
						title="Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl, Removable Splash Guard, 1000 W, Red"
						price={305.91}
						image="https://images-na.ssl-images-amazon.com/images/I/81O%2BGNdkzKL._AC_SX450_.jpg"
						rating={5}
					/>
				</div>
				<div className="home__row">
					{/* Product */}
					<Product
						id={811123}
						title="Fitbit Charge 4 Advanced Fitness Tracker with GPS, Swim Tracking & Up To 7 Day Battery, Black"
						price={128.99}
						image="https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg"
						rating={3}
					/>
					<Product
						id={201263}
						title="Echo Plus (2nd Gen) – Premium sound with a built-in smart home hub - Charcoal fabric"
						price={79.99}
						image="https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$"
						rating={5}
					/>
					<Product
						id={501223}
						title="New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)"
						price={969.0}
						image="https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$"
						rating={5}
					/>
				</div>
				<div className="home__row">
					{/* Product */}
					<Product
						id={682999}
						title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440"
						price={1094.98}
						image="https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg"
						rating={4}
					/>
				</div>
			</div>
		</div>
	);
}

export default Home;
