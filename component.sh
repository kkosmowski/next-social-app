if [ -z $1 ]; then
  # name – no name -> end of script
  read -p "Component name?: " name
  if [ -z $name ]; then
    echo "No name was given. Exiting."
    exit
  fi
else
  name=$1
fi

if [ -z $2 ]; then
  # type – to avoid any mistakes it is either "s" (default) or "c"
  read -p "Component type? [S/c]: " type
  type=${type:-s}

  if ([ $type != "s" ] && [ $type != "c" ]); then
    echo "Invalid type. Exiting"
    exit
  fi
else
  type=$2
fi

if [ -z $3 ]; then
  # with or without props? by default no props, options: "y" or "n"
  read -p "With props? [y/N]: " withProps
  withProps=${withProps:-n}
else
  withProps=$3
fi

if [ -z $4 ]; then
  # with css or without? default is no
  read -p "With styles? [y/N]: " withStyles
  withStyles=${withStyles:-n}
else
  withStyles=$4
fi

# build paths for simplicity
dir=./src/components/$name
file=$dir/$name.tsx
cssFile=$dir/$name.module.css
indexFile=$dir/index.ts

# create directory and files with content based on user's choices
mkdir $dir && touch $file
touch $indexFile

clientBeginning="'use client';\n\n"
beginning=""
typeProps="type Props = {\n\n}\n\n"
stylesImport="import styles from './$name.modules.css';\n\n"
bodyAndExport=" {\n\n  return (\n  );\n}\n\nexport default $name;\n"

result="function $name("

if [ "$type" = "c" ]; then
  beginning=$clientBeginning
else
  result="async $result"
fi

if [ "$withStyles" = "y" ]; then
  beginning="$beginning$stylesImport"
  touch $cssFile
fi

if [ "$withProps" = "y" ]; then
  beginning="$beginning$typeProps"
  result="$result{  }: Props)"
else
  result="$result)"
fi

printf "$beginning$result$bodyAndExport" >> $file
printf "import $name from './$name';\n\nexport default $name;\n" >> $indexFile

git add $dir

exit