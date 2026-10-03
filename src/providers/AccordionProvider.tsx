"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

type AccordionContextValue = {
	accordionSelectedId: string | undefined;
	setAccordionSelectedId: (id: string | undefined) => void;
	toggleAccordionItem: (id: string) => void;
};

type Props = {
	children: React.ReactNode;
};

const AccordionContext = createContext<AccordionContextValue | null>(null);

const AccordionProvider = (props: Props) => {
	const { children } = props;
	const [accordionSelectedId, setAccordionSelectedIdState] = useState<string | undefined>(
		undefined,
	);

	const setAccordionSelectedId = useCallback((id: string | undefined) => {
		setAccordionSelectedIdState(id);
	}, []);

	const toggleAccordionItem = useCallback((id: string) => {
		setAccordionSelectedIdState((currentSelectedId) =>
			currentSelectedId === id ? undefined : id,
		);
	}, []);

	const value = useMemo<AccordionContextValue>(
		() => ({
			accordionSelectedId,
			setAccordionSelectedId,
			toggleAccordionItem,
		}),
		[accordionSelectedId, setAccordionSelectedId, toggleAccordionItem],
	);

	return (
		<AccordionContext.Provider value={value}>{children}</AccordionContext.Provider>
	);
};

export const useAccordion = () => {
	const context = useContext(AccordionContext);

	if (!context) {
		throw new Error("useAccordion must be used within AccordionProvider.");
	}

	return context;
};

export default AccordionProvider;
