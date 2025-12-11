// 먹이 시스템

// 기본 먹이 (숫자, 원소 제외)
const BASE_FOODS = [
    // 동물 (다양하게 추가 - 필수 포함: 소, 돼지, 말, 토끼, 양, 코뿔소, 사자, 호랑이, 표범, 쥐, 고양이, 개, 고래, 닭, 오리, 거위, 칠면조, 공작, 염소)
    // 가축/농장 동물
    { name: 'cow', category: 'animal', emoji: '🐄' },
    { name: 'pig', category: 'animal', emoji: '🐷' },
    { name: 'horse', category: 'animal', emoji: '🐴' },
    { name: 'sheep', category: 'animal', emoji: '🐑' },
    { name: 'goat', category: 'animal', emoji: '🐐' },
    { name: 'donkey', category: 'animal', emoji: '🫏' },
    { name: 'rabbit', category: 'animal', emoji: '🐰' },
    { name: 'llama', category: 'animal', emoji: '🦙' },
    { name: 'ox', category: 'animal', emoji: '🐂' },
    { name: 'water buffalo', category: 'animal', emoji: '🐃' },
    // 조류
    { name: 'chicken', category: 'animal', emoji: '🐔' },
    { name: 'rooster', category: 'animal', emoji: '🐓' },
    { name: 'duck', category: 'animal', emoji: '🦆' },
    { name: 'goose', category: 'animal', emoji: '🪿' },
    { name: 'turkey', category: 'animal', emoji: '🦃' },
    { name: 'peacock', category: 'animal', emoji: '🦚' },
    { name: 'swan', category: 'animal', emoji: '🦢' },
    { name: 'flamingo', category: 'animal', emoji: '🦩' },
    { name: 'penguin', category: 'animal', emoji: '🐧' },
    { name: 'owl', category: 'animal', emoji: '🦉' },
    { name: 'eagle', category: 'animal', emoji: '🦅' },
    { name: 'parrot', category: 'animal', emoji: '🦜' },
    { name: 'dove', category: 'animal', emoji: '🕊️' },
    { name: 'crow', category: 'animal', emoji: '🐦‍⬛' },
    { name: 'sparrow', category: 'animal', emoji: '🐦' },
    { name: 'pigeon', category: 'animal', emoji: '🐦' },
    { name: 'pelican', category: 'animal', emoji: '🐦' },
    { name: 'stork', category: 'animal', emoji: '🐦' },
    { name: 'heron', category: 'animal', emoji: '🐦' },
    { name: 'crane', category: 'animal', emoji: '🐦' },
    // 반려동물
    { name: 'dog', category: 'animal', emoji: '🐕' },
    { name: 'cat', category: 'animal', emoji: '🐈' },
    { name: 'hamster', category: 'animal', emoji: '🐹' },
    { name: 'guinea pig', category: 'animal', emoji: '🐹' },
    { name: 'mouse', category: 'animal', emoji: '🐭' },
    { name: 'rat', category: 'animal', emoji: '🐀' },
    // 야생 고양잇과
    { name: 'lion', category: 'animal', emoji: '🦁' },
    { name: 'tiger', category: 'animal', emoji: '🐯' },
    { name: 'leopard', category: 'animal', emoji: '🐆' },
    { name: 'cheetah', category: 'animal', emoji: '🐆' },
    { name: 'jaguar', category: 'animal', emoji: '🐆' },
    { name: 'cougar', category: 'animal', emoji: '🐆' },
    { name: 'lynx', category: 'animal', emoji: '🐈' },
    // 야생 동물
    { name: 'elephant', category: 'animal', emoji: '🐘' },
    { name: 'rhino', category: 'animal', emoji: '🦏' },
    { name: 'hippo', category: 'animal', emoji: '🦛' },
    { name: 'giraffe', category: 'animal', emoji: '🦒' },
    { name: 'zebra', category: 'animal', emoji: '🦓' },
    { name: 'deer', category: 'animal', emoji: '🦌' },
    { name: 'moose', category: 'animal', emoji: '🫎' },
    { name: 'elk', category: 'animal', emoji: '🦌' },
    { name: 'reindeer', category: 'animal', emoji: '🦌' },
    { name: 'antelope', category: 'animal', emoji: '🦌' },
    { name: 'buffalo', category: 'animal', emoji: '🦬' },
    { name: 'bison', category: 'animal', emoji: '🦬' },
    { name: 'boar', category: 'animal', emoji: '🐗' },
    // 곰과
    { name: 'bear', category: 'animal', emoji: '🐻' },
    { name: 'polar bear', category: 'animal', emoji: '🐻‍❄️' },
    { name: 'panda', category: 'animal', emoji: '🐼' },
    { name: 'koala', category: 'animal', emoji: '🐨' },
    // 영장류
    { name: 'monkey', category: 'animal', emoji: '🐵' },
    { name: 'gorilla', category: 'animal', emoji: '🦍' },
    { name: 'orangutan', category: 'animal', emoji: '🦧' },
    { name: 'chimpanzee', category: 'animal', emoji: '🐒' },
    // 개과
    { name: 'wolf', category: 'animal', emoji: '🐺' },
    { name: 'fox', category: 'animal', emoji: '🦊' },
    { name: 'coyote', category: 'animal', emoji: '🐺' },
    { name: 'jackal', category: 'animal', emoji: '🐺' },
    // 기타 포유류
    { name: 'camel', category: 'animal', emoji: '🐫' },
    { name: 'kangaroo', category: 'animal', emoji: '🦘' },
    { name: 'sloth', category: 'animal', emoji: '🦥' },
    { name: 'otter', category: 'animal', emoji: '🦦' },
    { name: 'beaver', category: 'animal', emoji: '🦫' },
    { name: 'hedgehog', category: 'animal', emoji: '🦔' },
    { name: 'skunk', category: 'animal', emoji: '🦨' },
    { name: 'badger', category: 'animal', emoji: '🦡' },
    { name: 'raccoon', category: 'animal', emoji: '🦝' },
    { name: 'squirrel', category: 'animal', emoji: '🐿️' },
    { name: 'chipmunk', category: 'animal', emoji: '🐿️' },
    { name: 'porcupine', category: 'animal', emoji: '🦔' },
    { name: 'armadillo', category: 'animal', emoji: '🦔' },
    { name: 'mole', category: 'animal', emoji: '🐭' },
    { name: 'weasel', category: 'animal', emoji: '🐭' },
    { name: 'ferret', category: 'animal', emoji: '🐭' },
    // 해양 포유류
    { name: 'whale', category: 'animal', emoji: '🐋' },
    { name: 'dolphin', category: 'animal', emoji: '🐬' },
    { name: 'seal', category: 'animal', emoji: '🦭' },
    { name: 'walrus', category: 'animal', emoji: '🦭' },
    { name: 'orca', category: 'animal', emoji: '🐋' },
    // 파충류
    { name: 'snake', category: 'animal', emoji: '🐍' },
    { name: 'turtle', category: 'animal', emoji: '🐢' },
    { name: 'crocodile', category: 'animal', emoji: '🐊' },
    { name: 'alligator', category: 'animal', emoji: '🐊' },
    { name: 'lizard', category: 'animal', emoji: '🦎' },
    { name: 'chameleon', category: 'animal', emoji: '🦎' },
    { name: 'iguana', category: 'animal', emoji: '🦎' },
    { name: 'gecko', category: 'animal', emoji: '🦎' },
    { name: 'dragon', category: 'animal', emoji: '🐉' },
    // 양서류
    { name: 'frog', category: 'animal', emoji: '🐸' },
    { name: 'toad', category: 'animal', emoji: '🐸' },
    { name: 'salamander', category: 'animal', emoji: '🦎' },
    // 곤충
    { name: 'butterfly', category: 'animal', emoji: '🦋' },
    { name: 'bee', category: 'animal', emoji: '🐝' },
    { name: 'ant', category: 'animal', emoji: '🐜' },
    { name: 'ladybug', category: 'animal', emoji: '🐞' },
    { name: 'beetle', category: 'animal', emoji: '🪲' },
    { name: 'cricket', category: 'animal', emoji: '🦗' },
    { name: 'grasshopper', category: 'animal', emoji: '🦗' },
    { name: 'dragonfly', category: 'animal', emoji: '🦋' },
    { name: 'firefly', category: 'animal', emoji: '🐝' },
    { name: 'caterpillar', category: 'animal', emoji: '🐛' },
    { name: 'worm', category: 'animal', emoji: '🪱' },
    { name: 'cockroach', category: 'animal', emoji: '🪳' },
    { name: 'fly', category: 'animal', emoji: '🪰' },
    { name: 'mosquito', category: 'animal', emoji: '🦟' },
    { name: 'spider', category: 'animal', emoji: '🕷️' },
    { name: 'scorpion', category: 'animal', emoji: '🦂' },
    // 기타
    { name: 'snail', category: 'animal', emoji: '🐌' },
    { name: 'bat', category: 'animal', emoji: '🦇' },
    { name: 'unicorn', category: 'animal', emoji: '🦄' },
    
    // 과일 (다양하게 추가)
    { name: 'apple', category: 'fruit', emoji: '🍎' },
    { name: 'green apple', category: 'fruit', emoji: '🍏' },
    { name: 'banana', category: 'fruit', emoji: '🍌' },
    { name: 'orange', category: 'fruit', emoji: '🍊' },
    { name: 'tangerine', category: 'fruit', emoji: '🍊' },
    { name: 'lemon', category: 'fruit', emoji: '🍋' },
    { name: 'lime', category: 'fruit', emoji: '🍋' },
    { name: 'strawberry', category: 'fruit', emoji: '🍓' },
    { name: 'grape', category: 'fruit', emoji: '🍇' },
    { name: 'watermelon', category: 'fruit', emoji: '🍉' },
    { name: 'melon', category: 'fruit', emoji: '🍈' },
    { name: 'pineapple', category: 'fruit', emoji: '🍍' },
    { name: 'mango', category: 'fruit', emoji: '🥭' },
    { name: 'peach', category: 'fruit', emoji: '🍑' },
    { name: 'cherry', category: 'fruit', emoji: '🍒' },
    { name: 'pear', category: 'fruit', emoji: '🍐' },
    { name: 'kiwi', category: 'fruit', emoji: '🥝' },
    { name: 'coconut', category: 'fruit', emoji: '🥥' },
    { name: 'avocado', category: 'fruit', emoji: '🥑' },
    { name: 'blueberry', category: 'fruit', emoji: '🫐' },
    { name: 'olive', category: 'fruit', emoji: '🫒' },
    { name: 'tomato', category: 'fruit', emoji: '🍅' },
    { name: 'chestnut', category: 'fruit', emoji: '🌰' },
    { name: 'plum', category: 'fruit', emoji: '🍑' },
    { name: 'apricot', category: 'fruit', emoji: '🍑' },
    { name: 'papaya', category: 'fruit', emoji: '🥭' },
    { name: 'guava', category: 'fruit', emoji: '🍐' },
    { name: 'dragon fruit', category: 'fruit', emoji: '🍈' },
    { name: 'passion fruit', category: 'fruit', emoji: '🍇' },
    { name: 'pomegranate', category: 'fruit', emoji: '🍎' },
    { name: 'persimmon', category: 'fruit', emoji: '🍊' },
    { name: 'lychee', category: 'fruit', emoji: '🍒' },
    { name: 'raspberry', category: 'fruit', emoji: '🍓' },
    { name: 'blackberry', category: 'fruit', emoji: '🫐' },
    { name: 'cranberry', category: 'fruit', emoji: '🍒' },
    { name: 'grapefruit', category: 'fruit', emoji: '🍊' },
    { name: 'fig', category: 'fruit', emoji: '🍇' },
    { name: 'date', category: 'fruit', emoji: '🌰' },
    { name: 'jackfruit', category: 'fruit', emoji: '🍈' },
    { name: 'durian', category: 'fruit', emoji: '🍈' },
    { name: 'starfruit', category: 'fruit', emoji: '⭐' },
    
    // 채소 (대형마켓에서 살 수 있는 모든 야채)
    { name: 'carrot', category: 'vegetable', emoji: '🥕' },
    { name: 'broccoli', category: 'vegetable', emoji: '🥦' },
    { name: 'corn', category: 'vegetable', emoji: '🌽' },
    { name: 'potato', category: 'vegetable', emoji: '🥔' },
    { name: 'sweet potato', category: 'vegetable', emoji: '🍠' },
    { name: 'lettuce', category: 'vegetable', emoji: '🥬' },
    { name: 'cabbage', category: 'vegetable', emoji: '🥬' },
    { name: 'spinach', category: 'vegetable', emoji: '🥬' },
    { name: 'cucumber', category: 'vegetable', emoji: '🥒' },
    { name: 'bell pepper', category: 'vegetable', emoji: '🫑' },
    { name: 'hot pepper', category: 'vegetable', emoji: '🌶️' },
    { name: 'onion', category: 'vegetable', emoji: '🧅' },
    { name: 'garlic', category: 'vegetable', emoji: '🧄' },
    { name: 'mushroom', category: 'vegetable', emoji: '🍄' },
    { name: 'eggplant', category: 'vegetable', emoji: '🍆' },
    { name: 'pumpkin', category: 'vegetable', emoji: '🎃' },
    { name: 'peanut', category: 'vegetable', emoji: '🥜' },
    { name: 'bean', category: 'vegetable', emoji: '🫘' },
    { name: 'ginger', category: 'vegetable', emoji: '🫚' },
    { name: 'pea', category: 'vegetable', emoji: '🫛' },
    { name: 'celery', category: 'vegetable', emoji: '🥬' },
    { name: 'asparagus', category: 'vegetable', emoji: '🥦' },
    { name: 'zucchini', category: 'vegetable', emoji: '🥒' },
    { name: 'radish', category: 'vegetable', emoji: '🥕' },
    { name: 'beet', category: 'vegetable', emoji: '🍠' },
    { name: 'turnip', category: 'vegetable', emoji: '🥔' },
    { name: 'leek', category: 'vegetable', emoji: '🧅' },
    { name: 'artichoke', category: 'vegetable', emoji: '🥬' },
    { name: 'cauliflower', category: 'vegetable', emoji: '🥦' },
    { name: 'brussels sprout', category: 'vegetable', emoji: '🥬' },
    { name: 'kale', category: 'vegetable', emoji: '🥬' },
    { name: 'chard', category: 'vegetable', emoji: '🥬' },
    { name: 'arugula', category: 'vegetable', emoji: '🥬' },
    { name: 'bok choy', category: 'vegetable', emoji: '🥬' },
    { name: 'napa cabbage', category: 'vegetable', emoji: '🥬' },
    { name: 'romaine', category: 'vegetable', emoji: '🥬' },
    { name: 'endive', category: 'vegetable', emoji: '🥬' },
    { name: 'radicchio', category: 'vegetable', emoji: '🥬' },
    { name: 'watercress', category: 'vegetable', emoji: '🥬' },
    { name: 'green onion', category: 'vegetable', emoji: '🧅' },
    { name: 'shallot', category: 'vegetable', emoji: '🧅' },
    { name: 'chive', category: 'vegetable', emoji: '🧅' },
    { name: 'fennel', category: 'vegetable', emoji: '🥬' },
    { name: 'kohlrabi', category: 'vegetable', emoji: '🥬' },
    { name: 'parsnip', category: 'vegetable', emoji: '🥕' },
    { name: 'rutabaga', category: 'vegetable', emoji: '🥔' },
    { name: 'squash', category: 'vegetable', emoji: '🎃' },
    { name: 'butternut squash', category: 'vegetable', emoji: '🎃' },
    { name: 'acorn squash', category: 'vegetable', emoji: '🎃' },
    { name: 'spaghetti squash', category: 'vegetable', emoji: '🎃' },
    { name: 'okra', category: 'vegetable', emoji: '🥒' },
    { name: 'snow pea', category: 'vegetable', emoji: '🫛' },
    { name: 'snap pea', category: 'vegetable', emoji: '🫛' },
    { name: 'string bean', category: 'vegetable', emoji: '🫘' },
    { name: 'lima bean', category: 'vegetable', emoji: '🫘' },
    { name: 'kidney bean', category: 'vegetable', emoji: '🫘' },
    { name: 'black bean', category: 'vegetable', emoji: '🫘' },
    { name: 'chickpea', category: 'vegetable', emoji: '🫘' },
    { name: 'lentil', category: 'vegetable', emoji: '🫘' },
    { name: 'edamame', category: 'vegetable', emoji: '🫛' },
    { name: 'soybean', category: 'vegetable', emoji: '🫘' },
    { name: 'tofu', category: 'vegetable', emoji: '🧈' },
    { name: 'bamboo shoot', category: 'vegetable', emoji: '🎋' },
    { name: 'water chestnut', category: 'vegetable', emoji: '🌰' },
    { name: 'lotus root', category: 'vegetable', emoji: '🥔' },
    { name: 'taro', category: 'vegetable', emoji: '🥔' },
    { name: 'yam', category: 'vegetable', emoji: '🍠' },
    { name: 'cassava', category: 'vegetable', emoji: '🥔' },
    { name: 'jicama', category: 'vegetable', emoji: '🥔' },
    { name: 'daikon', category: 'vegetable', emoji: '🥕' },
    { name: 'horseradish', category: 'vegetable', emoji: '🥕' },
    { name: 'wasabi', category: 'vegetable', emoji: '🥬' },
    { name: 'celeriac', category: 'vegetable', emoji: '🥔' },
    { name: 'konjac', category: 'vegetable', emoji: '🥔' },
    { name: 'seaweed', category: 'vegetable', emoji: '🥬' },
    { name: 'kelp', category: 'vegetable', emoji: '🥬' },
    { name: 'nori', category: 'vegetable', emoji: '🥬' },
    { name: 'sprout', category: 'vegetable', emoji: '🌱' },
    { name: 'alfalfa', category: 'vegetable', emoji: '🌱' },
    { name: 'bean sprout', category: 'vegetable', emoji: '🌱' },
    { name: 'microgreen', category: 'vegetable', emoji: '🌱' },
    { name: 'herb', category: 'vegetable', emoji: '🌿' },
    { name: 'basil', category: 'vegetable', emoji: '🌿' },
    { name: 'parsley', category: 'vegetable', emoji: '🌿' },
    { name: 'cilantro', category: 'vegetable', emoji: '🌿' },
    { name: 'dill', category: 'vegetable', emoji: '🌿' },
    { name: 'mint', category: 'vegetable', emoji: '🌿' },
    { name: 'rosemary', category: 'vegetable', emoji: '🌿' },
    { name: 'thyme', category: 'vegetable', emoji: '🌿' },
    { name: 'oregano', category: 'vegetable', emoji: '🌿' },
    { name: 'sage', category: 'vegetable', emoji: '🌿' },
    { name: 'tarragon', category: 'vegetable', emoji: '🌿' },
    { name: 'chervil', category: 'vegetable', emoji: '🌿' },
    { name: 'bay leaf', category: 'vegetable', emoji: '🍃' },
    { name: 'lemongrass', category: 'vegetable', emoji: '🌿' },
    
    // 음식
    { name: 'bread', category: 'food', emoji: '🍞' },
    { name: 'pizza', category: 'food', emoji: '🍕' },
    { name: 'hamburger', category: 'food', emoji: '🍔' },
    { name: 'hotdog', category: 'food', emoji: '🌭' },
    { name: 'sandwich', category: 'food', emoji: '🥪' },
    { name: 'taco', category: 'food', emoji: '🌮' },
    { name: 'burrito', category: 'food', emoji: '🌯' },
    { name: 'rice', category: 'food', emoji: '🍚' },
    { name: 'noodles', category: 'food', emoji: '🍜' },
    { name: 'soup', category: 'food', emoji: '🍲' },
    { name: 'salad', category: 'food', emoji: '🥗' },
    { name: 'popcorn', category: 'food', emoji: '🍿' },
    { name: 'cake', category: 'food', emoji: '🍰' },
    { name: 'cookie', category: 'food', emoji: '🍪' },
    { name: 'donut', category: 'food', emoji: '🍩' },
    { name: 'icecream', category: 'food', emoji: '🍦' },
    { name: 'pancake', category: 'food', emoji: '🥞' },
    { name: 'waffle', category: 'food', emoji: '🧇' },
    { name: 'bagel', category: 'food', emoji: '🥯' },
    { name: 'pretzel', category: 'food', emoji: '🥨' },
    { name: 'croissant', category: 'food', emoji: '🥐' },
    { name: 'cheese', category: 'food', emoji: '🧀' },
    { name: 'butter', category: 'food', emoji: '🧈' },
    { name: 'honey', category: 'food', emoji: '🍯' },
    { name: 'chocolate', category: 'food', emoji: '🍫' },
    { name: 'candy', category: 'food', emoji: '🍬' },
    { name: 'lollipop', category: 'food', emoji: '🍭' },
    { name: 'pie', category: 'food', emoji: '🥧' },
    { name: 'cupcake', category: 'food', emoji: '🧁' },
    { name: 'egg', category: 'food', emoji: '🥚' },
    { name: 'fried egg', category: 'food', emoji: '🍳' },
    { name: 'bacon', category: 'food', emoji: '🥓' },
    { name: 'steak', category: 'food', emoji: '🥩' },
    { name: 'sushi', category: 'food', emoji: '🍣' },
    { name: 'dumpling', category: 'food', emoji: '🥟' },
    { name: 'french fries', category: 'food', emoji: '🍟' },
    
    // 생선/해산물 (다양하게 추가)
    { name: 'fish', category: 'fish', emoji: '🐟' },
    { name: 'tropical fish', category: 'fish', emoji: '🐠' },
    { name: 'blowfish', category: 'fish', emoji: '🐡' },
    { name: 'salmon', category: 'fish', emoji: '🐟' },
    { name: 'tuna', category: 'fish', emoji: '🐟' },
    { name: 'sardine', category: 'fish', emoji: '🐟' },
    { name: 'mackerel', category: 'fish', emoji: '🐟' },
    { name: 'cod', category: 'fish', emoji: '🐟' },
    { name: 'trout', category: 'fish', emoji: '🐟' },
    { name: 'bass', category: 'fish', emoji: '🐟' },
    { name: 'carp', category: 'fish', emoji: '🐟' },
    { name: 'herring', category: 'fish', emoji: '🐟' },
    { name: 'anchovy', category: 'fish', emoji: '🐟' },
    { name: 'shark', category: 'fish', emoji: '🦈' },
    { name: 'whale', category: 'fish', emoji: '🐋' },
    { name: 'dolphin', category: 'fish', emoji: '🐬' },
    { name: 'octopus', category: 'fish', emoji: '🐙' },
    { name: 'squid', category: 'fish', emoji: '🦑' },
    { name: 'shrimp', category: 'fish', emoji: '🦐' },
    { name: 'lobster', category: 'fish', emoji: '🦞' },
    { name: 'crab', category: 'fish', emoji: '🦀' },
    { name: 'oyster', category: 'fish', emoji: '🦪' },
    { name: 'shell', category: 'fish', emoji: '🐚' },
    { name: 'jellyfish', category: 'fish', emoji: '🪼' },
    { name: 'starfish', category: 'fish', emoji: '⭐' },
    { name: 'seal', category: 'fish', emoji: '🦭' },
    
    // 도형 (25가지)
    { name: 'circle', category: 'shape', emoji: '⭕' },
    { name: 'square', category: 'shape', emoji: '⬜' },
    { name: 'triangle', category: 'shape', emoji: '🔺' },
    { name: 'rectangle', category: 'shape', emoji: '▬' },
    { name: 'diamond', category: 'shape', emoji: '🔷' },
    { name: 'star', category: 'shape', emoji: '⭐' },
    { name: 'heart', category: 'shape', emoji: '❤️' },
    { name: 'oval', category: 'shape', emoji: '🥚' },
    { name: 'pentagon', category: 'shape', emoji: '⬠' },
    { name: 'hexagon', category: 'shape', emoji: '⬡' },
    { name: 'octagon', category: 'shape', emoji: '🛑' },
    { name: 'cross', category: 'shape', emoji: '✚' },
    { name: 'arrow', category: 'shape', emoji: '➡️' },
    { name: 'cube', category: 'shape', emoji: '🧊' },
    { name: 'sphere', category: 'shape', emoji: '🔮' },
    { name: 'cylinder', category: 'shape', emoji: '🥫' },
    { name: 'cone', category: 'shape', emoji: '🔻' },
    { name: 'pyramid', category: 'shape', emoji: '🔺' },
    { name: 'ring', category: 'shape', emoji: '💍' },
    { name: 'spiral', category: 'shape', emoji: '🌀' },
    { name: 'crescent', category: 'shape', emoji: '🌙' },
    { name: 'parallelogram', category: 'shape', emoji: '▱' },
    { name: 'trapezoid', category: 'shape', emoji: '⏢' },
    { name: 'rhombus', category: 'shape', emoji: '🔶' },
    { name: 'ellipse', category: 'shape', emoji: '⬭' },
];

// 원소 기호 (1-30번만)
const ELEMENTS = [
    { name: 'hydrogen', category: 'element', emoji: 'H' },
    { name: 'helium', category: 'element', emoji: 'He' },
    { name: 'lithium', category: 'element', emoji: 'Li' },
    { name: 'beryllium', category: 'element', emoji: 'Be' },
    { name: 'boron', category: 'element', emoji: 'B' },
    { name: 'carbon', category: 'element', emoji: 'C' },
    { name: 'nitrogen', category: 'element', emoji: 'N' },
    { name: 'oxygen', category: 'element', emoji: 'O' },
    { name: 'fluorine', category: 'element', emoji: 'F' },
    { name: 'neon', category: 'element', emoji: 'Ne' },
    { name: 'sodium', category: 'element', emoji: 'Na' },
    { name: 'magnesium', category: 'element', emoji: 'Mg' },
    { name: 'aluminum', category: 'element', emoji: 'Al' },
    { name: 'silicon', category: 'element', emoji: 'Si' },
    { name: 'phosphorus', category: 'element', emoji: 'P' },
    { name: 'sulfur', category: 'element', emoji: 'S' },
    { name: 'chlorine', category: 'element', emoji: 'Cl' },
    { name: 'argon', category: 'element', emoji: 'Ar' },
    { name: 'potassium', category: 'element', emoji: 'K' },
    { name: 'calcium', category: 'element', emoji: 'Ca' },
    { name: 'scandium', category: 'element', emoji: 'Sc' },
    { name: 'titanium', category: 'element', emoji: 'Ti' },
    { name: 'vanadium', category: 'element', emoji: 'V' },
    { name: 'chromium', category: 'element', emoji: 'Cr' },
    { name: 'manganese', category: 'element', emoji: 'Mn' },
    { name: 'iron', category: 'element', emoji: 'Fe' },
    { name: 'cobalt', category: 'element', emoji: 'Co' },
    { name: 'nickel', category: 'element', emoji: 'Ni' },
    { name: 'copper', category: 'element', emoji: 'Cu' },
    { name: 'zinc', category: 'element', emoji: 'Zn' },
];

// 일상 용품 (집안에서 볼 수 있는 물건들)
const HOUSEHOLD_ITEMS = [
    // 가구
    { name: 'bed', category: 'household', emoji: '🛏️' },
    { name: 'sofa', category: 'household', emoji: '🛋️' },
    { name: 'chair', category: 'household', emoji: '🪑' },
    { name: 'desk', category: 'household', emoji: '🪑' },
    { name: 'table', category: 'household', emoji: '🪑' },
    { name: 'wardrobe', category: 'household', emoji: '🚪' },
    { name: 'drawer', category: 'household', emoji: '🗄️' },
    { name: 'shelf', category: 'household', emoji: '📚' },
    { name: 'mirror', category: 'household', emoji: '🪞' },
    { name: 'door', category: 'household', emoji: '🚪' },
    { name: 'window', category: 'household', emoji: '🪟' },
    { name: 'curtain', category: 'household', emoji: '🪟' },
    { name: 'carpet', category: 'household', emoji: '🟫' },
    { name: 'rug', category: 'household', emoji: '🟫' },
    // 가전제품
    { name: 'fan', category: 'household', emoji: '🌀' },
    { name: 'air conditioner', category: 'household', emoji: '❄️' },
    { name: 'heater', category: 'household', emoji: '🔥' },
    { name: 'refrigerator', category: 'household', emoji: '🧊' },
    { name: 'washing machine', category: 'household', emoji: '🧺' },
    { name: 'dryer', category: 'household', emoji: '🧺' },
    { name: 'dishwasher', category: 'household', emoji: '🍽️' },
    { name: 'microwave', category: 'household', emoji: '📻' },
    { name: 'oven', category: 'household', emoji: '🔥' },
    { name: 'stove', category: 'household', emoji: '🔥' },
    { name: 'toaster', category: 'household', emoji: '🍞' },
    { name: 'blender', category: 'household', emoji: '🥤' },
    { name: 'coffee maker', category: 'household', emoji: '☕' },
    { name: 'kettle', category: 'household', emoji: '🫖' },
    { name: 'iron', category: 'household', emoji: '👔' },
    { name: 'vacuum cleaner', category: 'household', emoji: '🧹' },
    { name: 'television', category: 'household', emoji: '📺' },
    { name: 'radio', category: 'household', emoji: '📻' },
    { name: 'speaker', category: 'household', emoji: '🔊' },
    { name: 'computer', category: 'household', emoji: '💻' },
    { name: 'laptop', category: 'household', emoji: '💻' },
    { name: 'keyboard', category: 'household', emoji: '⌨️' },
    { name: 'mouse', category: 'household', emoji: '🖱️' },
    { name: 'printer', category: 'household', emoji: '🖨️' },
    { name: 'phone', category: 'household', emoji: '📱' },
    { name: 'telephone', category: 'household', emoji: '📞' },
    { name: 'camera', category: 'household', emoji: '📷' },
    // 조명
    { name: 'lamp', category: 'household', emoji: '💡' },
    { name: 'light bulb', category: 'household', emoji: '💡' },
    { name: 'chandelier', category: 'household', emoji: '💡' },
    { name: 'flashlight', category: 'household', emoji: '🔦' },
    { name: 'candle', category: 'household', emoji: '🕯️' },
    // 시계
    { name: 'clock', category: 'household', emoji: '🕐' },
    { name: 'wall clock', category: 'household', emoji: '🕰️' },
    { name: 'alarm clock', category: 'household', emoji: '⏰' },
    { name: 'watch', category: 'household', emoji: '⌚' },
    // 악기
    { name: 'piano', category: 'household', emoji: '🎹' },
    { name: 'guitar', category: 'household', emoji: '🎸' },
    { name: 'violin', category: 'household', emoji: '🎻' },
    { name: 'drum', category: 'household', emoji: '🥁' },
    { name: 'trumpet', category: 'household', emoji: '🎺' },
    { name: 'saxophone', category: 'household', emoji: '🎷' },
    { name: 'flute', category: 'household', emoji: '🎵' },
    { name: 'harmonica', category: 'household', emoji: '🎵' },
    { name: 'accordion', category: 'household', emoji: '🪗' },
    { name: 'banjo', category: 'household', emoji: '🪕' },
    { name: 'maracas', category: 'household', emoji: '🪇' },
    // 신발/의류
    { name: 'shoes', category: 'household', emoji: '👟' },
    { name: 'boots', category: 'household', emoji: '🥾' },
    { name: 'sandals', category: 'household', emoji: '🩴' },
    { name: 'slippers', category: 'household', emoji: '🩴' },
    { name: 'high heels', category: 'household', emoji: '👠' },
    { name: 'sneakers', category: 'household', emoji: '👟' },
    { name: 'hat', category: 'household', emoji: '🎩' },
    { name: 'cap', category: 'household', emoji: '🧢' },
    { name: 'glasses', category: 'household', emoji: '👓' },
    { name: 'sunglasses', category: 'household', emoji: '🕶️' },
    { name: 'bag', category: 'household', emoji: '👜' },
    { name: 'backpack', category: 'household', emoji: '🎒' },
    { name: 'umbrella', category: 'household', emoji: '☂️' },
    { name: 'tie', category: 'household', emoji: '👔' },
    { name: 'scarf', category: 'household', emoji: '🧣' },
    { name: 'gloves', category: 'household', emoji: '🧤' },
    { name: 'socks', category: 'household', emoji: '🧦' },
    // 욕실 용품
    { name: 'bathtub', category: 'household', emoji: '🛁' },
    { name: 'shower', category: 'household', emoji: '🚿' },
    { name: 'toilet', category: 'household', emoji: '🚽' },
    { name: 'toothbrush', category: 'household', emoji: '🪥' },
    { name: 'soap', category: 'household', emoji: '🧼' },
    { name: 'towel', category: 'household', emoji: '🛁' },
    { name: 'razor', category: 'household', emoji: '🪒' },
    // 주방 용품
    { name: 'pot', category: 'household', emoji: '🍲' },
    { name: 'pan', category: 'household', emoji: '🍳' },
    { name: 'knife', category: 'household', emoji: '🔪' },
    { name: 'fork', category: 'household', emoji: '🍴' },
    { name: 'spoon', category: 'household', emoji: '🥄' },
    { name: 'chopsticks', category: 'household', emoji: '🥢' },
    { name: 'plate', category: 'household', emoji: '🍽️' },
    { name: 'bowl', category: 'household', emoji: '🥣' },
    { name: 'cup', category: 'household', emoji: '☕' },
    { name: 'glass', category: 'household', emoji: '🥛' },
    { name: 'bottle', category: 'household', emoji: '🍾' },
    { name: 'jar', category: 'household', emoji: '🫙' },
    // 이동 수단
    { name: 'bicycle', category: 'household', emoji: '🚲' },
    { name: 'scooter', category: 'household', emoji: '🛴' },
    { name: 'skateboard', category: 'household', emoji: '🛹' },
    { name: 'car', category: 'household', emoji: '🚗' },
    { name: 'motorcycle', category: 'household', emoji: '🏍️' },
    // 장난감/취미
    { name: 'ball', category: 'household', emoji: '⚽' },
    { name: 'teddy bear', category: 'household', emoji: '🧸' },
    { name: 'doll', category: 'household', emoji: '🪆' },
    { name: 'puzzle', category: 'household', emoji: '🧩' },
    { name: 'kite', category: 'household', emoji: '🪁' },
    { name: 'yo-yo', category: 'household', emoji: '🪀' },
    // 문구류
    { name: 'book', category: 'household', emoji: '📚' },
    { name: 'notebook', category: 'household', emoji: '📓' },
    { name: 'pen', category: 'household', emoji: '🖊️' },
    { name: 'pencil', category: 'household', emoji: '✏️' },
    { name: 'crayon', category: 'household', emoji: '🖍️' },
    { name: 'scissors', category: 'household', emoji: '✂️' },
    { name: 'ruler', category: 'household', emoji: '📏' },
    { name: 'eraser', category: 'household', emoji: '📝' },
    { name: 'calendar', category: 'household', emoji: '📅' },
    { name: 'envelope', category: 'household', emoji: '✉️' },
    { name: 'stamp', category: 'household', emoji: '📮' },
    // 기타
    { name: 'key', category: 'household', emoji: '🔑' },
    { name: 'lock', category: 'household', emoji: '🔒' },
    { name: 'bell', category: 'household', emoji: '🔔' },
    { name: 'magnet', category: 'household', emoji: '🧲' },
    { name: 'battery', category: 'household', emoji: '🔋' },
    { name: 'plug', category: 'household', emoji: '🔌' },
    { name: 'hammer', category: 'household', emoji: '🔨' },
    { name: 'screwdriver', category: 'household', emoji: '🪛' },
    { name: 'wrench', category: 'household', emoji: '🔧' },
    { name: 'saw', category: 'household', emoji: '🪚' },
    { name: 'axe', category: 'household', emoji: '🪓' },
    { name: 'broom', category: 'household', emoji: '🧹' },
    { name: 'mop', category: 'household', emoji: '🧹' },
    { name: 'bucket', category: 'household', emoji: '🪣' },
    { name: 'trash can', category: 'household', emoji: '🗑️' },
    { name: 'basket', category: 'household', emoji: '🧺' },
    { name: 'ladder', category: 'household', emoji: '🪜' },
    { name: 'fire extinguisher', category: 'household', emoji: '🧯' },
    { name: 'first aid kit', category: 'household', emoji: '🩹' },
    { name: 'pillow', category: 'household', emoji: '🛏️' },
    { name: 'blanket', category: 'household', emoji: '🛏️' },
    { name: 'picture frame', category: 'household', emoji: '🖼️' },
    { name: 'vase', category: 'household', emoji: '🏺' },
    { name: 'plant pot', category: 'household', emoji: '🪴' },
];

class Food {
    constructor(x, y, foodData) {
        this.x = x;
        this.y = y;
        this.name = foodData.name;
        this.category = foodData.category;
        this.emoji = foodData.emoji;
        this.eaten = false;
    }

    draw(ctx, cellSize) {
        if (this.eaten) return;
        
        const pixelX = this.x * cellSize + cellSize / 2;
        const pixelY = this.y * cellSize + cellSize / 2;
        
        // 도형, 원소기호는 진한 노란색으로 표시 (테두리 없음)
        if (this.category === 'shape' || this.category === 'element') {
            // 텍스트만 진한 노란색으로 표시
            ctx.fillStyle = '#DAA520'; // 진한 노란색 (골든로드)
            ctx.font = `bold ${cellSize * 1.2}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(this.emoji, pixelX, pixelY);
        } else {
            // 기타 먹이는 이모지로 표시 (2배 크기)
            ctx.font = `${cellSize * 1.5}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(this.emoji, pixelX, pixelY);
        }
    }

    checkCollision(snakeX, snakeY) {
        return this.x === snakeX && this.y === snakeY && !this.eaten;
    }
}

class FoodManager {
    constructor(maze, levelData) {
        this.maze = maze;
        this.foods = [];
        this.foodCount = levelData.foodCount;
        this.scoreMultiplier = levelData.scoreMultiplier;
        this.foodsEaten = 0;
        this.generateFoods();
    }

    // 카테고리별 비중을 고려하여 먹이 선택
    selectFoodWithWeight() {
        // 카테고리별 비중 설정
        // 일상용품: 20%, 원소: 10%, 도형: 10%, 기타(동물/과일/채소/생선): 60%
        const roll = Math.random() * 100;
        
        if (roll < 20) {
            // 일상용품 (20%)
            return HOUSEHOLD_ITEMS[Math.floor(Math.random() * HOUSEHOLD_ITEMS.length)];
        } else if (roll < 30) {
            // 원소 (10%)
            return ELEMENTS[Math.floor(Math.random() * ELEMENTS.length)];
        } else if (roll < 40) {
            // 도형 (10%)
            const shapes = BASE_FOODS.filter(f => f.category === 'shape');
            return shapes[Math.floor(Math.random() * shapes.length)];
        } else {
            // 기타 - 동물, 과일, 채소, 생선 등 (60%)
            const otherFoods = BASE_FOODS.filter(f => f.category !== 'shape');
            return otherFoods[Math.floor(Math.random() * otherFoods.length)];
        }
    }

    generateFoods() {
        const availablePositions = [];
        const height = this.maze.length;
        const width = this.maze[0].length;
        
        // 상하좌우 4방향 체크용
        const directions = [
            { dx: 0, dy: -1 },  // 위
            { dx: 0, dy: 1 },   // 아래
            { dx: -1, dy: 0 },  // 왼쪽
            { dx: 1, dy: 0 }    // 오른쪽
        ];
        
        // 미로에서 빈 공간(0) 찾기 - 상하좌우 최소 1칸씩 빈 공간 필요
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                if (this.maze[y][x] === 0) {
                    // 상하좌우 4방향 모두 빈 공간인지 확인
                    let allDirectionsClear = true;
                    for (const dir of directions) {
                        const ny = y + dir.dy;
                        const nx = x + dir.dx;
                        // 경계 밖이거나 벽이면 불가
                        if (ny < 0 || ny >= height || nx < 0 || nx >= width || this.maze[ny][nx] === 1) {
                            allDirectionsClear = false;
                            break;
                        }
                    }
                    // 상하좌우 모두 빈 공간이면 먹이 배치 가능
                    if (allDirectionsClear) {
                        availablePositions.push({ x, y });
                    }
                }
            }
        }

        // 조건에 맞는 위치가 부족하면 조건 완화 (최소 3방향만 빈 공간)
        if (availablePositions.length < this.foodCount) {
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    if (this.maze[y][x] === 0) {
                        const exists = availablePositions.some(p => p.x === x && p.y === y);
                        if (!exists) {
                            // 최소 3방향은 빈 공간인지 확인
                            let clearCount = 0;
                            for (const dir of directions) {
                                const ny = y + dir.dy;
                                const nx = x + dir.dx;
                                if (ny >= 0 && ny < height && nx >= 0 && nx < width && this.maze[ny][nx] !== 1) {
                                    clearCount++;
                                }
                            }
                            if (clearCount >= 3) {
                                availablePositions.push({ x, y });
                            }
                        }
                    }
                }
            }
        }
        
        // 여전히 부족하면 모든 빈 공간 허용
        if (availablePositions.length < this.foodCount) {
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    if (this.maze[y][x] === 0) {
                        const exists = availablePositions.some(p => p.x === x && p.y === y);
                        if (!exists) {
                            availablePositions.push({ x, y });
                        }
                    }
                }
            }
        }

        // 랜덤하게 먹이 배치 (먹이 간 최소 2칸 간격 유지)
        const shuffled = availablePositions.sort(() => Math.random() - 0.5);
        const selectedPositions = [];
        const minDistance = 2; // 먹이 간 최소 거리
        
        for (const pos of shuffled) {
            // 이미 선택된 위치들과의 거리 체크
            let tooClose = false;
            for (const selected of selectedPositions) {
                const distance = Math.abs(pos.x - selected.x) + Math.abs(pos.y - selected.y);
                if (distance < minDistance + 1) { // 맨해튼 거리로 최소 3 이상 (2칸 간격)
                    tooClose = true;
                    break;
                }
            }
            
            if (!tooClose) {
                selectedPositions.push(pos);
                if (selectedPositions.length >= this.foodCount) {
                    break;
                }
            }
        }
        
        // 간격 조건을 만족하는 위치가 부족하면 조건 완화하여 추가
        if (selectedPositions.length < this.foodCount) {
            for (const pos of shuffled) {
                const exists = selectedPositions.some(p => p.x === pos.x && p.y === pos.y);
                if (!exists) {
                    // 최소 1칸 간격으로 완화
                    let tooClose = false;
                    for (const selected of selectedPositions) {
                        const distance = Math.abs(pos.x - selected.x) + Math.abs(pos.y - selected.y);
                        if (distance < 2) { // 최소 1칸 간격
                            tooClose = true;
                            break;
                        }
                    }
                    if (!tooClose) {
                        selectedPositions.push(pos);
                        if (selectedPositions.length >= this.foodCount) {
                            break;
                        }
                    }
                }
            }
        }

        selectedPositions.forEach(pos => {
            const foodData = this.selectFoodWithWeight();
            this.foods.push(new Food(pos.x, pos.y, foodData));
        });
    }

    draw(ctx, cellSize) {
        this.foods.forEach(food => food.draw(ctx, cellSize));
    }

    checkCollision(snakeX, snakeY) {
        for (let food of this.foods) {
            if (food.checkCollision(snakeX, snakeY)) {
                food.eaten = true;
                this.foodsEaten++;
                return {
                    found: true,
                    food: food,
                    score: this.scoreMultiplier
                };
            }
        }
        return { found: false };
    }

    getAllEaten() {
        return this.foods.every(food => food.eaten);
    }

    getRemainingCount() {
        return this.foods.filter(food => !food.eaten).length;
    }
}
