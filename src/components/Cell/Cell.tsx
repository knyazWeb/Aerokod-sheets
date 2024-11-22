import { useAppDispatch, useAppSelector } from '@@/src/lib';
import { CellProps } from './CellTypes';
import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@@/src/helpers';
import { useOnClickOutside } from '@@/src/hooks';
import { updateCell } from '@@/src/lib/features';

const Cell = ({
  col,
  row,
  isColDeleteMode,
  isRowDeleteMode,
  setSelectedColumns,
  setSelectedRows,
  selected,
  backgroundColor = '#FFF',
}: CellProps) => {
  const dispatch = useAppDispatch();
  const value = useAppSelector((state) => state.table.table.data[row][col]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isColorPanel, setIsColorPanel] = useState<boolean>(false);
  const [colorValue, setColorValue] = useState<string>(backgroundColor);
  const editableRef = useRef<HTMLDivElement>(null);
  const colorRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(() => {
    dispatch(
      updateCell({
        row,
        col,
        value: editableRef.current?.innerText || '',
        backgroundColor: colorValue,
      }),
    );
  }, [row, col, colorValue, editableRef.current?.innerText]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      editableRef.current?.blur();
    }
  };

  const clickHandler = useCallback(() => {
    if (isColDeleteMode && setSelectedColumns) {
      setSelectedColumns((prev) => {
        if (prev.includes(col)) {
          return prev.filter((item) => item !== col);
        }
        return [...prev, col];
      });
    } else if (isRowDeleteMode && setSelectedRows) {
      setSelectedRows((prev) => {
        if (prev.includes(row)) {
          return prev.filter((item) => item !== row);
        }
        return [...prev, row];
      });
    } else {
      setIsEditing(true);
    }
  }, [isColDeleteMode, isRowDeleteMode, col, row]);

  useOnClickOutside(editableRef, () => {
    setIsEditing(false);
  });

  useEffect(() => {
    if (editableRef.current && value.value) {
      editableRef.current.innerText = value.value;
    }
  }, [value]);

  useEffect(() => {
    if (isEditing && !isColDeleteMode && !isRowDeleteMode) {
      editableRef.current?.focus();
      setIsColorPanel(true);
    } else {
      editableRef.current?.blur();
      setIsColorPanel(false);
    }
  }, [isEditing]);

  useEffect(() => {
    if (isColorPanel) {
      editableRef.current?.focus();
    }
  }, []);

  return (
    <>
      <div
        ref={editableRef}
        contentEditable={true}
        suppressContentEditableWarning
        onFocus={() => setIsEditing(true)}
        onKeyDown={handleKeyDown}
        onBlur={handleChange}
        onClick={clickHandler}
        style={{ backgroundColor: colorValue }}
        className={cn(
          'w-[100px] h-[60px] border p-2 text-nowrap overflow-y-auto outline-blue-300 cursor-pointer',
          selected ? 'border-red-600 border' : 'border-black',
        )}
      >
        {isColorPanel && (
          <input
            value={colorValue}
            onChange={(e) => setColorValue(e.target.value)}
            onBlur={handleChange}
            ref={colorRef}
            type='color'
            className='fixed top-[15px] right-[15px] z-50'
          />
        )}
      </div>
    </>
  );
};

export { Cell };
